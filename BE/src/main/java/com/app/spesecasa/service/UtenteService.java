package com.app.spesecasa.service;

import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.UtenteRepository;
import com.app.spesecasa.utils.CommonRunTimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtenteService {

	@Autowired
	private UtenteRepository utenteRepository;

	public Utente getUtenteById(Integer id){
		return utenteRepository.findById(id).orElse(null);
	}

	public List<Utente> getAllUsers(){
		return utenteRepository.findAll();
	}

	public void insertUtente(Utente utente) {
			utenteRepository.save(utente);

	}

	public void deleteUtenteById(Integer id){
		utenteRepository.deleteById(id);
	}
}
