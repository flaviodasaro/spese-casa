package com.app.spesecasa.dto;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class RequestUpdatePagamento {

	@NotNull
	private Integer idPagamento;
	private Boolean flgPagato;
	private BigDecimal importo;

	public Integer getIdPagamento() {
		return idPagamento;
	}

	public void setIdPagamento(Integer idPagamento) {
		this.idPagamento = idPagamento;
	}

	public Boolean getFlgPagato() {
		return flgPagato;
	}

	public void setFlgPagato(Boolean flgPagato) {
		this.flgPagato = flgPagato;
	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}
}
