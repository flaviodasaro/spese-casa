package com.app.spesecasa.dto;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class RequestInserisciSaldoParziale {

	@NotNull
	private Integer idPagamento;

	@NotNull
	private Integer idUtentePagante;

	@NotNull
	@Digits(integer = 15, fraction = 2)
	private BigDecimal importo;

	public Integer getIdPagamento() {
		return idPagamento;
	}

	public void setIdPagamento(Integer idPagamento) {
		this.idPagamento = idPagamento;
	}

	public Integer getIdUtentePagante() {
		return idUtentePagante;
	}

	public void setIdUtentePagante(Integer idUtentePagante) {
		this.idUtentePagante = idUtentePagante;
	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}
}
