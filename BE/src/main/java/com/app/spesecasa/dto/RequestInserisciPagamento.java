package com.app.spesecasa.dto;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class RequestInserisciPagamento {

	@NotNull
	private Integer idUtentePagante;
	@NotNull
	private Integer idGruppoPartecipante;
	@NotNull
	private Integer idCategoriaSpesa;
	@NotNull
	private BigDecimal importo;

	public Integer getIdUtentePagante() {
		return idUtentePagante;
	}

	public void setIdUtentePagante(Integer idUtentePagante) {
		this.idUtentePagante = idUtentePagante;
	}

	public Integer getIdGruppoPartecipante() {
		return idGruppoPartecipante;
	}

	public void setIdGruppoPartecipante(Integer idGruppoPartecipante) {
		this.idGruppoPartecipante = idGruppoPartecipante;
	}

	public Integer getIdCategoriaSpesa() {
		return idCategoriaSpesa;
	}

	public void setIdCategoriaSpesa(Integer idCategoriaSpesa) {
		this.idCategoriaSpesa = idCategoriaSpesa;
	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}
}
