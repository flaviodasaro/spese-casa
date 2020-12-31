package com.app.spesecasa.controller;

import com.app.spesecasa.entity.Gruppo;
import com.app.spesecasa.service.GruppoService;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/gruppo")
@CrossOrigin("*")
public class GruppoController {

	@Autowired
	private GruppoService gruppoService;

	@GetMapping("/{id}")
	public ResponseEntity<Gruppo> getGruppo(@PathVariable(name = "id")  Integer id) {
		try{
			Gruppo result = gruppoService.getGruppoById(id);
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
	public ResponseEntity<List<Gruppo>> getAllGruppi() {
		try{
			return ResponseEntity.ok(gruppoService.getAllGruppi());
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveGruppo(@Valid @RequestBody Gruppo gruppo) {
		try{
			gruppoService.insertGruppo(gruppo);
			return ResponseEntity.created(URI.create("/gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteGruppo(@PathVariable(name = "id") Integer id) {
		try{
			gruppoService.deleteGruppoById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
}
