package com.app.spesecasa.service;

import com.app.spesecasa.dto.*;
import com.app.spesecasa.entity.CategoriaSpesa;
import com.app.spesecasa.entity.Gruppo;
import com.app.spesecasa.entity.Pagamento;
import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.CategoriaSpesaRepository;
import com.app.spesecasa.repository.PagamentoRepository;
import com.app.spesecasa.utils.CommonErrors;
import com.app.spesecasa.utils.CommonRunTimeException;
import com.app.spesecasa.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class PagamentoService {

	@Autowired
	private PagamentoRepository pagamentoRepository;

	@Autowired
	private CategoriaSpesaRepository categoriaSpesaRepository;

	@Autowired
	private UtenteService utenteService;

	@Autowired
	private GruppoService gruppoService;

	public Pagamento getPagamentoById(Integer id) {
		return pagamentoRepository.findById(id).orElse(null);
	}

	public List<Pagamento> getAllPagamenti() {
		return pagamentoRepository.findAll();
	}

	public void insertPagamento(Pagamento p) {
		pagamentoRepository.save(p);
	}

	public void deletePagamentoById(Integer id) {
		pagamentoRepository.deleteById(id);
	}

	private Pair<Utente, Gruppo> getPairUtenteGruppoByIds(Integer idUtente, Integer idGruppo) {
		Utente utente = utenteService.getUtenteById(idUtente);
		if (utente == null) {
			CommonErrors.throwExeptionUtenteNotFound(idUtente);
		}

		Gruppo gruppo = gruppoService.getGruppoById(idGruppo);
		if (gruppo == null) {
			CommonErrors.throwExeptionGruppoNotFound(idGruppo);
		}

		return Pair.of(utente, gruppo);
	}

	public void insertPagamentoByIds(RequestInserisciPagamentoSingolo body) {

		Pair<Utente, Gruppo> pair = getPairUtenteGruppoByIds(body.getIdUtentePagante(), body.getIdGruppoPartecipante());
		insertNewPagamento(body.getSinglePaymentInfo(), pair);
	}

	private void insertNewPagamento(SinglePaymentInfo paymentInfo, Pair<Utente, Gruppo> pair) {
		Integer idCategoriaSpesa = paymentInfo.getIdCategoriaSpesa();
		if (idCategoriaSpesa == null) {
			throw new CommonRunTimeException("Id categoria di spesa non deve essere null", HttpStatus.BAD_REQUEST,
					Constants.CATEGORIA_SPESA_NULL);
		}

		CategoriaSpesa categoriaSpesa = categoriaSpesaRepository.findById(idCategoriaSpesa).orElseThrow(
				() -> new CommonRunTimeException("Categoria spesa non trovata", Constants.CATEGORIA_SPESA_NOT_FOUND));

		Pagamento pagamento = new Pagamento();
		pagamento.setUtentePagante(pair.getFirst());
		pagamento.setGruppoPartecipante(pair.getSecond());
		pagamento.setCategoriaSpesa(categoriaSpesa);
		pagamento.setFlgPagato(Boolean.FALSE);
		pagamento.setImporto(paymentInfo.getImporto());
		pagamento.setDescrizione(paymentInfo.getDescrizione());

		insertPagamento(pagamento);
	}

	public void massiveInsertPagamentoByIds(RequestInserisciPagamentoMassivo body) {
		List<SinglePaymentInfo> payments = body.getPayments();
		if (payments == null || payments.isEmpty()) {
			throw new CommonRunTimeException("Lista pagamenti nulla o vuota", HttpStatus.BAD_REQUEST,
					Constants.PAYMENT_LIST_EMPTY);
		}

		Pair<Utente, Gruppo> pair = getPairUtenteGruppoByIds(body.getIdUtentePagante(), body.getIdGruppoPartecipante());
		payments.forEach(pay -> insertNewPagamento(pay, pair));

	}

	public void updatePagamento(RequestUpdatePagamento body) {
		Integer idPagamento = body.getIdPagamento();
		Pagamento p = getPagamentoById(idPagamento);
		if (p == null) {
			CommonErrors.throwExeptionPagamentoNotFound(idPagamento);
			return;
		}

		BigDecimal importo = body.getImporto();
		Boolean flgPagato = body.getFlgPagato();

		if (importo != null) {
			p.setImporto(importo);
		}
		if (flgPagato != null) {
			p.setFlgPagato(flgPagato);
		}

		pagamentoRepository.save(p);
	}

	public GetTotAvereDto getTotAvereByUtenti(Integer idUtente1, Integer idUtente2) {
		List<GetTotAvereDto> queryResult = pagamentoRepository
				.getTotAvereByUtenti(idUtente1, idUtente2, idUtente2, idUtente1);
		if (queryResult.isEmpty()) {
			throw new CommonRunTimeException("Errore getTotAvereByUtenti", Constants.GET_TOT_AVERE_BY_UTENTI_ERROR);
		} else {
			return queryResult.get(0);
		}

	}

	public ResponseGetDashboardInit getDashboardInit() {
		List<DashboardAggregateWithCounter> utenteMore = pagamentoRepository
				.getDashboadrAggregateUtentePagatoPiuVolte();
		List<DashboardAggregateWithCounter> gruppoMore = pagamentoRepository
				.getDashboadrAggregateGruppoPartecipatoPiuVolte();
		List<DashboardAggregateWithAmount> utenteBigPay = pagamentoRepository.getDashboadrAggregateutenteBigPay();

		ResponseGetDashboardInit response = new ResponseGetDashboardInit();

		if (!utenteMore.isEmpty()) {
			response.setUtentePagatoPiuVolte(utenteMore.get(0));
		}
		if (!gruppoMore.isEmpty()) {
			response.setGruppoPartecipatoPiuVolte(gruppoMore.get(0));
		}
		if (!utenteBigPay.isEmpty()) {
			response.setUtenteBigPay(utenteBigPay.get(0));
		}

		return response;
	}

	public ResponsePaginatedList getPagamentiByFilters(RequestGetPagamentiByFilters body) {
		String descrizioneRaw = body.getDescrizione();
		String descrizione = descrizioneRaw == null ? null : "%" + descrizioneRaw.toUpperCase() + "%";
		LocalDate tmsInserimentoMaxRaw = body.getTmsInserimentoMax();
		LocalDate tmsModificaMaxRaw = body.getTmsModificaMax();
		LocalDateTime tmsInserimentoMax =  tmsInserimentoMaxRaw == null ? null : tmsInserimentoMaxRaw.atTime(LocalTime.MAX);
		LocalDateTime tmsModificaMax =  tmsModificaMaxRaw == null ? null : tmsModificaMaxRaw.atTime(LocalTime.MAX);

		List<Pagamento> list = pagamentoRepository.getPagamentiByFilters(
				body.getIdPagamento(),
				body.getIdUtentePagante(),
				body.getIdGruppoPartecipante(),
				body.getIdCategoriaSpesa(),
				body.getFlgPagato(),
				body.getImportoMin(),
				body.getImportoMax(),
				descrizione,
				body.getTmsInserimentoMin(),
				tmsInserimentoMax,
				body.getTmsModificaMin(),
				tmsModificaMax
		);
		return new ResponsePaginatedList(list);
	}
}
