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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

	public Pagamento getPagamentoById(Integer id){
		return pagamentoRepository.findById(id).orElse(null);
	}

	public List<Pagamento> getAllPagamenti(){
		return pagamentoRepository.findAll();
	}

	public void insertPagamento(Pagamento p){
		pagamentoRepository.save(p);
	}

	public void deletePagamentoById(Integer id){
		pagamentoRepository.deleteById(id);
	}

	public void insertPagamentoByIds(RequestInserisciPagamento body){
		Integer idUtente = body.getIdUtentePagante();
		Utente utente = utenteService.getUtenteById(idUtente);
		if(utente == null){
			CommonErrors.throwExeptionUtenteNotFound(idUtente);
		}

		Integer idGruppo = body.getIdGruppoPartecipante();
		Gruppo gruppo = gruppoService.getGruppoById(idGruppo);
		if(gruppo == null){
			CommonErrors.throwExeptionGruppoNotFound(idGruppo);
		}

		CategoriaSpesa categoriaSpesa = categoriaSpesaRepository.findById(body.getIdCategoriaSpesa())
				.orElseThrow(() -> new CommonRunTimeException("Categoria spesa non trovata", Constants.CATEGORIA_SPESA_NOT_FOUND));

		Pagamento pagamento = new Pagamento();
		pagamento.setUtentePagante(utente);
		pagamento.setGruppoPartecipante(gruppo);
		pagamento.setCategoriaSpesa(categoriaSpesa);
		pagamento.setFlgPagato(Boolean.FALSE);
		pagamento.setImporto(body.getImporto());

		insertPagamento(pagamento);
	}

	public void updatePagamento(RequestUpdatePagamento body){
		Integer idPagamento = body.getIdPagamento();
		Pagamento p = getPagamentoById(idPagamento);
		if(p == null){
			CommonErrors.throwExeptionPagamentoNotFound(idPagamento);
			return;
		}

		BigDecimal importo = body.getImporto();
		Boolean flgPagato = body.getFlgPagato();

		if(importo != null){
			p.setImporto(importo);
		}
		if(flgPagato != null){
			p.setFlgPagato(flgPagato);
		}

		pagamentoRepository.save(p);
	}

	public GetTotAvereDto getTotAvereByUtenti(Integer idUtente1, Integer idUtente2){
		List<GetTotAvereDto> queryResult = pagamentoRepository.getTotAvereByUtenti(idUtente1, idUtente2, idUtente2, idUtente1);
		if(queryResult.isEmpty()){
			throw new CommonRunTimeException("Errore getTotAvereByUtenti", Constants.GET_TOT_AVERE_BY_UTENTI_ERROR);
		}
		else{
			return queryResult.get(0);
		}

	}

	public ResponseGetDashboardInit getDashboardInit(){
		List<DashboardAggregateWithCounter> utenteMore = pagamentoRepository.getDashboadrAggregateUtentePagatoPiuVolte();
		List<DashboardAggregateWithCounter> gruppoMore = pagamentoRepository.getDashboadrAggregateGruppoPartecipatoPiuVolte();
		List<DashboardAggregateWithAmount> utenteBigPay = pagamentoRepository.getDashboadrAggregateutenteBigPay();

		ResponseGetDashboardInit response = new ResponseGetDashboardInit();

		if(utenteMore.size() > 0){
			response.setUtentePagatoPiuVolte(utenteMore.get(0));
		}
		if(gruppoMore.size() > 0){
			response.setGruppoPartecipatoPiuVolte(gruppoMore.get(0));
		}
		if(utenteBigPay.size() > 0){
			response.setUtenteBigPay(utenteBigPay.get(0));
		}

		return response;
	}
}
