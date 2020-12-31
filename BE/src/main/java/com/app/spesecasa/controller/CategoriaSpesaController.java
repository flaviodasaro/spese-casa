package com.app.spesecasa.controller;

import com.app.spesecasa.entity.CategoriaSpesa;
import com.app.spesecasa.repository.CategoriaSpesaRepository;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/categoria-spesa")
@CrossOrigin("*")
public class CategoriaSpesaController {

	@Autowired
	private CategoriaSpesaRepository categoriaSpesaRepository;

	@GetMapping("/{id}")
	public ResponseEntity<CategoriaSpesa> getGruppo(@PathVariable(name = "id")  Integer id) {
		try{
			CategoriaSpesa result = categoriaSpesaRepository.findById(id).orElse(null);
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
	public ResponseEntity<List<CategoriaSpesa>> getAllGruppi() {
		try{
			return ResponseEntity.ok(categoriaSpesaRepository.findAll());
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveGruppo(@Valid @RequestBody CategoriaSpesa body) {
		try{
			categoriaSpesaRepository.save(body);
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
			categoriaSpesaRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
}
