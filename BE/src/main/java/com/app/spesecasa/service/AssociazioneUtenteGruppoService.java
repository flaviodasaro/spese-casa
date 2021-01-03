package com.app.spesecasa.service;

import com.app.spesecasa.dto.RequestAddGroupAndAssociations;
import com.app.spesecasa.dto.RequestSaveUtenteAndGruppo;
import com.app.spesecasa.entity.AssociazioneUtenteGruppo;
import com.app.spesecasa.entity.Gruppo;
import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.AssociazioneUtenteGruppoRepository;
import com.app.spesecasa.utils.CommonRunTimeException;
import com.app.spesecasa.utils.Constants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssociazioneUtenteGruppoService {
	@Autowired
	private AssociazioneUtenteGruppoRepository associazioneUtenteGruppoRepository;

	@Autowired
	private UtenteService utenteService;

	@Autowired
	private GruppoService gruppoService;

	// ************************ BEGIN: STANDARD CRUD ASSOCIAZIONE **********************************
	public AssociazioneUtenteGruppo getAssociazioneById(Integer id){
		return associazioneUtenteGruppoRepository.findById(id).orElse(null);
	}

	public List<AssociazioneUtenteGruppo> getAllAssociazioniUtenteGruppo(){
		return associazioneUtenteGruppoRepository.findAll();
	}

	public void insertAssociazioneUtenteGruppo(AssociazioneUtenteGruppo g){
		associazioneUtenteGruppoRepository.save(g);
	}

	public void deleteAssociazioneUtenteGruppoById(Integer id){
		associazioneUtenteGruppoRepository.deleteById(id);
	}
	// **************************** END: STANDARD CRUD ASSOCIAZIONE ******************************************

	// **************************** BEGIN: ASSOCIAZIONE ADVANCED SECTION  **************************************

	public void insertAssociazioneUtenteGruppoMassiva(List<Integer> idsUtente, Integer idGruppo){
		Gruppo gruppo = gruppoService.getGruppoById(idGruppo);
		if(gruppo == null){
			throw new CommonRunTimeException(String.format("Gruppo con id %s non trovato", idGruppo), Constants.GRUPPO_NOT_FOUND);
		}

		List<Utente> utenti = idsUtente.stream().map(idUtente -> {
			Utente utente = utenteService.getUtenteById(idUtente);
			if(utente == null){
				throw new CommonRunTimeException(String.format("Utente con id %s non trovato", idUtente), Constants.UTENTE_NOT_FOUND);
			}
			return utente;
		}).collect(Collectors.toList());

		utenti.forEach(utente -> {
			AssociazioneUtenteGruppo associazioneUtenteGruppo = new AssociazioneUtenteGruppo();
			associazioneUtenteGruppo.setUtente(utente);
			associazioneUtenteGruppo.setGruppo(gruppo);

			associazioneUtenteGruppoRepository.save(associazioneUtenteGruppo);
		});
	}


	public void addUtenteAndGruppo(RequestSaveUtenteAndGruppo body) {
		Utente utente = new Utente();
		String username = body.getUsername();
		utente.setUsername(username);
		utente = utenteService.insertAndGetUtente(utente);

		if (Boolean.TRUE.equals(body.getAddGroupWithSingleUser())) {
			Gruppo gruppo = new Gruppo();
			gruppo.setNomeGruppo(StringUtils.substring(String.format("Gruppo singolo con utente: %s", username), 0, 45));
			gruppo.setNoteGruppo("Gruppo auto generato dal servizio /add-user-and-group");
			gruppo = gruppoService.insertAndGetGruppo(gruppo);

			AssociazioneUtenteGruppo associazioneUtenteGruppo = new AssociazioneUtenteGruppo();
			associazioneUtenteGruppo.setUtente(utente);
			associazioneUtenteGruppo.setGruppo(gruppo);
			insertAssociazioneUtenteGruppo(associazioneUtenteGruppo);
		}
	}

	public void addGroupAndAssociations(RequestAddGroupAndAssociations body){
		Gruppo gruppo = new Gruppo();
		gruppo.setNomeGruppo(body.getGroupName());
		gruppo.setNoteGruppo(body.getGroupNotes());
		gruppo = gruppoService.insertAndGetGruppo(gruppo);

		insertAssociazioneUtenteGruppoMassiva(body.getUsers(), gruppo.getIdGruppo());
	}
}
