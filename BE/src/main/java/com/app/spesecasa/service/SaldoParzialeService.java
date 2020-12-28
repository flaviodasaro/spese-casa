package com.app.spesecasa.service;

import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.dto.RequestInserisciSaldoParziale;
import com.app.spesecasa.dto.ResponseGetTotSingoloUtente;
import com.app.spesecasa.entity.Pagamento;
import com.app.spesecasa.entity.SaldoParziale;
import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.SaldoParzialeRepository;
import com.app.spesecasa.utils.CommonErrors;
import com.app.spesecasa.utils.CommonRunTimeException;
import com.app.spesecasa.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaldoParzialeService {
	@Autowired
	private SaldoParzialeRepository saldoParzialeRepository;

	@Autowired
	private PagamentoService pagamentoService;

	@Autowired
	private UtenteService utenteService;


	public SaldoParziale getSaldoParzialeById(Integer id){
		return saldoParzialeRepository.findById(id).orElse(null);
	}

	public List<SaldoParziale> getAllSaldoParziale(){
		return saldoParzialeRepository.findAll();
	}

	public void insertSaldoParziale(SaldoParziale s){
		saldoParzialeRepository.save(s);
	}

	public void deleteSaldoParzialeById(Integer id){
		saldoParzialeRepository.deleteById(id);
	}

	public void insertSaldoParzialeByIds(RequestInserisciSaldoParziale body){
		Integer idPagamento = body.getIdPagamento();
		Pagamento pagamento = pagamentoService.getPagamentoById(idPagamento);
		if(pagamento == null){
			CommonErrors.throwExeptionPagamentoNotFound(idPagamento);
		}
		Integer idUtente = body.getIdUtentePagante();
		Utente utente = utenteService.getUtenteById(idUtente);
		if(utente == null){
			CommonErrors.throwExeptionUtenteNotFound(idUtente);
		}

		SaldoParziale saldoParziale = new SaldoParziale();
		saldoParziale.setFkPagamento(pagamento);
		saldoParziale.setImporto(body.getImporto());
		saldoParziale.setUtentePagante(utente);

		insertSaldoParziale(saldoParziale);
	}

	public GetTotAvereDto getTotAvereSaldo(Integer idUtentePagamento, Integer idUtenteSaldo){
		List<GetTotAvereDto> queryResult = saldoParzialeRepository.getTotAvereSaldoByUtenti(idUtentePagamento, idUtenteSaldo);
		if(queryResult.isEmpty()){
			throw new CommonRunTimeException("Errore getTotAvereSaldo", Constants.GET_TOT_AVERE_SALDO_BY_UTENTI_ERROR);
		}
		return queryResult.get(0);
	}

	public List<ResponseGetTotSingoloUtente> getTotSingoloUtente(Integer idUtente){
		List<Utente> utenti = utenteService.getAllUsers();
		return utenti.stream().filter(utente -> !utente.getIdUtente().equals(idUtente)).map(altroUtente -> {
			Integer idUtenteSaldante = altroUtente.getIdUtente();
			GetTotAvereDto totAvere = pagamentoService.getTotAvereByUtenti(idUtente, idUtenteSaldante);
			GetTotAvereDto totAvereSaldo = getTotAvereSaldo(idUtente, idUtenteSaldante);

			BigDecimal totAvereDecimalValue = totAvere.getTotAvere();
			BigDecimal totAvereSaldoDecimalValue = totAvereSaldo.getTotAvere() == null ? BigDecimal.ZERO : totAvereSaldo.getTotAvere();

			return new ResponseGetTotSingoloUtente(totAvereDecimalValue == null ? null : totAvere.getTotAvere().subtract(totAvereSaldoDecimalValue), altroUtente);
		}).filter(res -> res.getDiff() != null && res.getDiff().compareTo(BigDecimal.ZERO) > 0).collect(Collectors.toList());
	}
}
