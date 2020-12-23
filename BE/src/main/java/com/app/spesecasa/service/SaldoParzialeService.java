package com.app.spesecasa.service;

import com.app.spesecasa.dto.RequestInserisciSaldoParziale;
import com.app.spesecasa.entity.Pagamento;
import com.app.spesecasa.entity.SaldoParziale;
import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.SaldoParzialeRepository;
import com.app.spesecasa.utils.CommonErrors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
