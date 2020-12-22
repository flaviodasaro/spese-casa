package com.app.spesecasa.controller;

import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utente")
public class UtenteController {

	@Autowired
	private UtenteService utenteService;

	@GetMapping("/{id}")
	public ResponseEntity<Utente> getUtente(@PathVariable(name = "id") Integer id) {
		Utente result = utenteService.getUserById(id);
		if(result == null){
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(result);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Utente>> getAllUtenti() {
		return ResponseEntity.ok(utenteService.getAllUsers());
	}

}
