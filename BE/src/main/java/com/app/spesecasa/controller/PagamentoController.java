package com.app.spesecasa.controller;

import com.app.spesecasa.dto.*;
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
import java.math.BigDecimal;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pagamento")
@CrossOrigin("*")
public class PagamentoController {

	@Autowired
	private PagamentoService pagamentoService;

	@GetMapping("/{id}")
	public ResponseEntity<Pagamento> getPagamento(@PathVariable(name = "id") Integer id) {
		try {
			Pagamento result = pagamentoService.getPagamentoById(id);
			if (result == null) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/all")
	public ResponseEntity<List<Pagamento>> getAllPagamento() {
		try {
			return ResponseEntity.ok(pagamentoService.getAllPagamenti());
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/by-filters")
	public ResponseEntity<ResponsePaginatedList> getPagamentiByFilters(@RequestBody RequestGetPagamentiByFilters body) {
		try {
			return ResponseEntity.ok(pagamentoService.getPagamentiByFilters(body));
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> savePagamento(@Valid @RequestBody Pagamento gruppo) {
		try {
			pagamentoService.insertPagamento(gruppo);
			return ResponseEntity.created(URI.create("/gruppo/save")).build();
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deletePagamentoo(@PathVariable(name = "id") Integer id) {
		try {
			pagamentoService.deletePagamentoById(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/save-by-ids")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> savePagamentoByIds(@Valid @RequestBody RequestInserisciPagamentoSingolo body) {
		try {
			pagamentoService.insertPagamentoByIds(body);
			return ResponseEntity.created(URI.create("/pagamento/save-by-ids")).build();
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/massive-save-by-ids")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Void> massiveSavePagamentoByIds(@Valid @RequestBody RequestInserisciPagamentoMassivo body) {
		try {
			pagamentoService.massiveInsertPagamentoByIds(body);
			return ResponseEntity.created(URI.create("/pagamento/massive-save-by-ids")).build();
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PutMapping("/update")
	public ResponseEntity<Void> updatePagamentoByIds(@Valid @RequestBody RequestUpdatePagamento body) {
		if (body.getFlgPagato() == null && body.getImporto() == null) {
			throw new CommonRunTimeException("Update rifiutato. Valorizzare flgPagato, importo o entrambi",
					HttpStatus.BAD_REQUEST, Constants.UPDATE_PAGAMENTO_BAD_REQUEST);
		}
		try {
			pagamentoService.updatePagamento(body);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PutMapping("/massive-update")
	public ResponseEntity<Void> massiveUpdatePagamentoByIds(@Valid @RequestBody RequestUpdatePagamentoMassivo body) {
		try {
			body.getList().forEach(el -> {
				if (el.getFlgPagato() == null && el.getImporto() == null) {
					throw new CommonRunTimeException("Update rifiutato. Valorizzare flgPagato, importo o entrambi",
							HttpStatus.BAD_REQUEST, Constants.UPDATE_PAGAMENTO_BAD_REQUEST);
				} else {
					pagamentoService.updatePagamento(el);
				}

			});
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/get-tot-avere")
	public ResponseEntity<GetTotAvereDto> getTotAvere(@RequestParam(value = "idUtente1") Integer idUtente1,
			@RequestParam(value = "idUtente2") Integer idUtente2) {
		try {
			return ResponseEntity.ok(pagamentoService.getTotAvereByUtenti(idUtente1, idUtente2));
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("/get-tot-avere-by-utenti-list")
	public ResponseEntity<List<DiffsByUtentiDto>> getTotAvereByUtentiList(
			@RequestBody GetTotAvereByUtentiList body) {
		List<Integer> idList = body.getIdList();
		if(idList == null || idList.size() < 2){
			throw new CommonRunTimeException("idLlist deve avere una lunghezza >= 2", HttpStatus.BAD_REQUEST, Constants.UTENTE_LIST_NOT_ENOUGH);
		}
		try {
			return ResponseEntity.ok(pagamentoService.getTotAvereByUtentiList(idList));
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}
	@PostMapping("/get-tot-avere-aggregate")
	public ResponseEntity<Map<Integer, BigDecimal>> getTotAvereAggregate(
			@RequestBody GetTotAvereByUtentiList body) {
		List<Integer> idList = body.getIdList();
		if(idList == null || idList.size() < 2){
			throw new CommonRunTimeException("idLlist deve avere una lunghezza >= 2", HttpStatus.BAD_REQUEST, Constants.UTENTE_LIST_NOT_ENOUGH);
		}
		try {
			return ResponseEntity.ok(pagamentoService.getTotAvereAggregate(idList));
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

	@GetMapping("/home-init")
	public ResponseEntity<ResponseGetDashboardInit> getHomeInit() {
		try {
			return ResponseEntity.ok(pagamentoService.getDashboardInit());
		} catch (Exception e) {
			Utils.handleCommonError(e);
			return null;
		}
	}

}
