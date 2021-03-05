package com.app.spesecasa.dto.pagamenti;

import javax.validation.constraints.NotNull;

public abstract class AbstractRequestInserisciPagamento {
	@NotNull
	protected Integer idUtentePagante;
	@NotNull
	protected Integer idGruppoPartecipante;

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
}
