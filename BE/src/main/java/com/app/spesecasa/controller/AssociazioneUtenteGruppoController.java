package com.app.spesecasa.controller;

import com.app.spesecasa.dto.utenti.RequestAddGroupAndAssociations;
import com.app.spesecasa.dto.utenti.RequestInserisciAssociazione;
import com.app.spesecasa.dto.utenti.RequestSaveUtenteAndGruppo;
import com.app.spesecasa.entity.AssociazioneUtenteGruppo;
import com.app.spesecasa.service.AssociazioneUtenteGruppoService;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/associazione-utente-gruppo")
@CrossOrigin("*")
public class AssociazioneUtenteGruppoController {

	@Autowired
	private AssociazioneUtenteGruppoService associazioneUtenteGruppoService;

	@GetMapping("/{id}")
	public ResponseEntity<AssociazioneUtenteGruppo> getAssociazione(@PathVariable(name = "id")  Integer id) {
		try{
			AssociazioneUtenteGruppo result = associazioneUtenteGruppoService.getAssociazioneById(id);
			if(result == null){
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(result);
		}
		catch (Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/all")
	public ResponseEntity<List<AssociazioneUtenteGruppo>> getAllAssociazioni() {
		try{
			return ResponseEntity.ok(associazioneUtenteGruppoService.getAllAssociazioniUtenteGruppo());
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveAssociazione(@Valid @RequestBody AssociazioneUtenteGruppo associazione) {
		try{
			associazioneUtenteGruppoService.insertAssociazioneUtenteGruppo(associazione);
			return ResponseEntity.created(URI.create("/associazione-utente-gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteAssociazione(@PathVariable(name = "id") Integer id) {
		try{
			associazioneUtenteGruppoService.deleteAssociazioneUtenteGruppoById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save-by-utente-gruppo")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveAssociazione(@Valid @RequestBody RequestInserisciAssociazione body) {
		try{
			associazioneUtenteGruppoService.insertAssociazioneUtenteGruppoMassiva(body.getIdsUtente(), body.getIdGruppo());
			return ResponseEntity.created(URI.create("/associazione-utente-gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/add-user-and-group")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveUtenteAndGruppo(@Valid @RequestBody RequestSaveUtenteAndGruppo body) {
		try{
			associazioneUtenteGruppoService.addUtenteAndGruppo(body);
			return ResponseEntity.created(URI.create("/add-user-and-group")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
	@PostMapping("/add-group-and-associations")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> addGroupAndAssociations(@Valid @RequestBody RequestAddGroupAndAssociations body) {
		try{
			associazioneUtenteGruppoService.addGroupAndAssociations(body);
			return ResponseEntity.created(URI.create("/add-group-and-associations")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/get-by-gruppo")
	public ResponseEntity<List<AssociazioneUtenteGruppo>> getAssociazioniByGruppo(@RequestParam("idGruppo") Integer idGruppo) {
		try{
			return ResponseEntity.ok(associazioneUtenteGruppoService.getAssociazioniByGruppo(idGruppo));
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
}
