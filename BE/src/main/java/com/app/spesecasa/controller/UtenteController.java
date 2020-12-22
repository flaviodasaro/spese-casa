package com.app.spesecasa.controller;

import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.service.UtenteService;
import com.app.spesecasa.utils.CommonRunTimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/utente")
@CrossOrigin("*")
public class UtenteController {

	@Autowired
	private UtenteService utenteService;

	@GetMapping("/{id}")
	public ResponseEntity<Utente> getUtente(@PathVariable(name = "id")  Integer id) {
		try{
			Utente result = utenteService.getUtenteById(id);
			if(result == null){
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(result);
		}
		catch (Exception e){
			throw new CommonRunTimeException(e);
		}
	}

	@GetMapping("/all")
	public ResponseEntity<List<Utente>> getAllUtenti() {
		try{
			return ResponseEntity.ok(utenteService.getAllUsers());
		}
		catch(Exception e){
			throw new CommonRunTimeException(e);
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveUtente(@Valid @RequestBody Utente utente) {
		try{
			utenteService.insertUtente(utente);
			return ResponseEntity.created(URI.create("/utente/save")).build();
		}
		catch(Exception e){
			throw new CommonRunTimeException(e);
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteUtente(@PathVariable(name = "id") Integer id) {
		try{
			utenteService.deleteUtenteById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			throw new CommonRunTimeException(e);
		}
	}
}
