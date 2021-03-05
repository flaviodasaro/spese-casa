package com.app.spesecasa.service;

import com.app.spesecasa.dto.*;
import com.app.spesecasa.dto.pagamenti.*;
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
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
		Pagamento pagamento = getPagamentoReadyForInsert(paymentInfo, pair);
		insertPagamento(pagamento);
	}

	private Pagamento getPagamentoReadyForInsert(SinglePaymentInfo paymentInfo, Pair<Utente, Gruppo> pair) {
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
		return pagamento;
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

	public List<DiffsByUtentiDto> getTotAvereByUtentiList(List<Integer> idList) {
		List<Utente> utenteList = idList.stream().map(utenteService::getUtenteById).collect(Collectors.toList());
		if (utenteList.contains(null)) {
			List<Integer> utentiNull = idList.stream()
					.filter(id -> utenteList.stream().noneMatch(ut -> ut != null && ut.getIdUtente().equals(id)))
					.collect(Collectors.toList());
			throw new CommonRunTimeException("Errore utente/i non trovato: " + utentiNull, Constants.UTENTE_NOT_FOUND);
		}

		//tutto ok
		List<DiffsByUtentiDto> res = new ArrayList<>();
		for (int i = 0; i < idList.size() - 1; ++i) {
			for (int j = i + 1; j < idList.size(); ++j) {
				Integer utente1 = idList.get(i);
				Integer utente2 = idList.get(j);

				GetTotAvereDto getTotAvereDto = getTotAvereByUtenti(utente1, utente2);
				BigDecimal value = getTotAvereDto.getTotAvere() != null ?
						getTotAvereDto.getTotAvere() :
						BigDecimal.ZERO;
				value = value.setScale(2, RoundingMode.HALF_DOWN);

				if (BigDecimal.ZERO.compareTo(value) > 0) {
					utente1 = idList.get(j);
					utente2 = idList.get(i);
					value = value.multiply(BigDecimal.valueOf(-1)).setScale(2, RoundingMode.HALF_DOWN);
				}
				res.add(new DiffsByUtentiDto(utente1, utente2, new GetTotAvereDto(value)));
			}
		}
		return res.stream().filter(diff -> BigDecimal.ZERO.compareTo(diff.getGetTotAvereDto().getTotAvere()) < 0)
				.collect(Collectors.toList());

	}

	public Map<Integer, BigDecimal> getTotAvereAggregate(List<Integer> idList) {
		List<DiffsByUtentiDto> diffsByUtentiDtos = getTotAvereByUtentiList(idList);
		Map<Integer, BigDecimal> result = new HashMap<>();
		idList.forEach(id -> result.put(id, BigDecimal.ZERO));
		diffsByUtentiDtos.forEach(el -> {
			BigDecimal value = el.getGetTotAvereDto().getTotAvere() != null ?
					el.getGetTotAvereDto().getTotAvere() :
					BigDecimal.ZERO;
			Integer utente1 = el.getUtente1();
			Integer utente2 = el.getUtente2();
			result.put(utente1, result.get(utente1).add(value).setScale(2, RoundingMode.HALF_EVEN));
			result.put(utente2, result.get(utente2).subtract(value).setScale(2, RoundingMode.HALF_EVEN));
		});

		return result;
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
		LocalDateTime tmsInserimentoMax = tmsInserimentoMaxRaw == null ?
				null :
				tmsInserimentoMaxRaw.atTime(LocalTime.MAX);
		LocalDateTime tmsModificaMax = tmsModificaMaxRaw == null ? null : tmsModificaMaxRaw.atTime(LocalTime.MAX);

		List<Pagamento> list = pagamentoRepository
				.getPagamentiByFilters(body.getIdPagamento(), body.getIdUtentePagante(), body.getIdGruppoPartecipante(),
						body.getIdCategoriaSpesa(), body.getFlgPagato(), body.getImportoMin(), body.getImportoMax(),
						descrizione, body.getTmsInserimentoMin(), tmsInserimentoMax, body.getTmsModificaMin(),
						tmsModificaMax);
		return new ResponsePaginatedList(list);
	}

	public void archiveAll(List<ArchiveRequestElement> body) {
		List<Utente> users = utenteService.getAllUsers();

		boolean everyUserExists = body.stream().allMatch(
				el -> users.stream().anyMatch(user -> user.getIdUtente().equals(el.getIdUtenteBrv())) && users.stream()
						.anyMatch(user -> user.getIdUtente().equals(el.getIdUtenteKtv())));

		if (!everyUserExists) {
			throw new CommonRunTimeException("Utente non trovato", HttpStatus.PRECONDITION_REQUIRED,
					Constants.UTENTE_NOT_FOUND);
		}

		List<InquiryForArchiveDto> inquiryData = utenteService.getInquiryForArchive();
		if (inquiryData == null || inquiryData.size() != users.size()) {
			throw new CommonRunTimeException("Almeno un utente non ha un gruppo singolo associato",
					Constants.GROUPS_WITH_SINGLE_USER_MANDATORY);
		}

		List<Pagamento> pagamentiFake = body.stream().map(pay -> {
			Utente utente = users.stream().filter(u -> u.getIdUtente().equals(pay.getIdUtenteBrv())).findFirst()
					.orElseThrow(
							() -> new CommonRunTimeException("Utente brv non trovato", Constants.UTENTE_NOT_FOUND));

			Integer idGruppo = inquiryData.stream().filter(el -> el.getIdUtente().equals(pay.getIdUtenteKtv()))
					.findFirst()
					.orElseThrow(() -> new CommonRunTimeException("Gruppo singolo per utente ktv non trovato", Constants.GRUPPO_NOT_FOUND))
					.getIdGruppo();

			Gruppo gruppo = gruppoService.getGruppoById(idGruppo);

			SinglePaymentInfo payInfo = new SinglePaymentInfo();
			payInfo.setDescrizione("Pagamento fittizio post archiviazione pregresso");
			payInfo.setIdCategoriaSpesa(Constants.CATEGORIA_SPESA_FITTIZIA);
			payInfo.setImporto(pay.getImporto());

			return getPagamentoReadyForInsert(payInfo, Pair.of(utente, gruppo));

		}).collect(Collectors.toList());

		Integer pagamentiAggiornati = pagamentoRepository.payAll();

		if(pagamentiAggiornati == null || pagamentiAggiornati.equals(0)){
			throw new CommonRunTimeException("Update fallito");
		}
		else {
			pagamentiFake.forEach(this::insertPagamento);
		}
	}
}
