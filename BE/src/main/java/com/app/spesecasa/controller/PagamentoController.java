package com.app.spesecasa.controller;

import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.dto.RequestInserisciPagamento;
import com.app.spesecasa.dto.RequestUpdatePagamento;
import com.app.spesecasa.entity.Pagamento;
import com.app.spesecasa.service.PagamentoService;
import com.app.spesecasa.utils.CommonRunTimeException;
import com.app.spesecasa.utils.Constants;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pagamento")
public class PagamentoController {

	@Autowired
	private PagamentoService pagamentoService;

	@GetMapping("/{id}")
	public ResponseEntity<Pagamento> getPagamento(@PathVariable(name = "id")  Integer id) {
		try{
			Pagamento result = pagamentoService.getPagamentoById(id);
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
	public ResponseEntity<List<Pagamento>> getAllPagamento() {
		try{
			return ResponseEntity.ok(pagamentoService.getAllPagamenti());
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> savePagamento(@Valid @RequestBody Pagamento gruppo) {
		try{
			pagamentoService.insertPagamento(gruppo);
			return ResponseEntity.created(URI.create("/gruppo/save")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deletePagamentoo(@PathVariable(name = "id") Integer id) {
		try{
			pagamentoService.deletePagamentoById(id);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save-by-ids")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> savePagamentoByIds(@Valid @RequestBody RequestInserisciPagamento body) {
		try{
			pagamentoService.insertPagamentoByIds(body);
			return ResponseEntity.created(URI.create("/gruppo/save-by-ids")).build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PutMapping("/update")
	public ResponseEntity<Void> updatePagamentoByIds(@Valid @RequestBody RequestUpdatePagamento body) {
		if(body.getFlgPagato() == null && body.getImporto() == null){
			throw new CommonRunTimeException("Update rifiutato. Valorizzare flgPagato, importo o entrambi", HttpStatus.BAD_REQUEST,
					Constants.UPDATE_PAGAMENTO_BAD_REQUEST);
		}
		try{
			pagamentoService.updatePagamento(body);
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/get-tot-avere")
			public ResponseEntity<GetTotAvereDto> getTotAvere(@RequestParam(value = "idUtente1") Integer idUtente1, @RequestParam(value = "idUtente2") Integer idUtente2 ) {
		try{
			return ResponseEntity.ok(pagamentoService.getTotAvereByUtenti(idUtente1, idUtente2));
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
}
