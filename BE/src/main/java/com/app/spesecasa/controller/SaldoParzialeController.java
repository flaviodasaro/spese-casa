package com.app.spesecasa.controller;

import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.dto.RequestInserisciSaldoParziale;
import com.app.spesecasa.dto.ResponseGetTotSingoloUtente;
import com.app.spesecasa.entity.SaldoParziale;
import com.app.spesecasa.service.SaldoParzialeService;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/saldo-parziale")
@CrossOrigin("*")
public class SaldoParzialeController {

	@Autowired
	private SaldoParzialeService saldoParzialeService;

	@GetMapping("/{id}")
	public ResponseEntity<SaldoParziale> getSaldoParziale(@PathVariable(name = "id")  Integer id) {
		try{
			SaldoParziale result = saldoParzialeService.getSaldoParzialeById(id);
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
	public ResponseEntity<List<SaldoParziale>> getAllSaldoParziale() {
		try{
			return ResponseEntity.ok(saldoParzialeService.getAllSaldoParziale());
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveSaldoParziale(@Valid @RequestBody SaldoParziale body) {
		try{
			saldoParzialeService.insertSaldoParziale(body);
			return ResponseEntity.created(URI.create("/gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save-by-ids")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> saveSaldoParzialeByIds(@Valid @RequestBody RequestInserisciSaldoParziale body) {
		try{
			saldoParzialeService.insertSaldoParzialeByIds(body);
			return ResponseEntity.created(URI.create("/gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteSaldoParziale(@PathVariable(name = "id") Integer id) {
		try{
			saldoParzialeService.deleteSaldoParzialeById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/get-tot-avere")
	public ResponseEntity<GetTotAvereDto> getTotAvere(@RequestHeader(value = "idUtentePagamento") Integer idUtentePagamento, @RequestHeader(value = "idUtenteSaldo") Integer idUtenteSaldo ) {
		try{
			return ResponseEntity.ok(saldoParzialeService.getTotAvereSaldo(idUtentePagamento, idUtenteSaldo));
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}


	@GetMapping("/get-tot-avere-for-each")
	public ResponseEntity<List<ResponseGetTotSingoloUtente>> getTotAvereForEach(@RequestParam(value = "idUtente") Integer idUtente ) {
		try{
			return ResponseEntity.ok(saldoParzialeService.getTotSingoloUtente(idUtente));
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}


}
