package com.app.spesecasa.dto.utenti;

import javax.validation.constraints.NotNull;
import java.util.List;

public class RequestInserisciAssociazione {

	@NotNull
	private List<Integer> idsUtente;

	@NotNull
	private Integer idGruppo;

	public List<Integer> getIdsUtente() {
		return idsUtente;
	}

	public void setIdsUtente(List<Integer> idsUtente) {
		this.idsUtente = idsUtente;
	}

	public Integer getIdGruppo() {
		return idGruppo;
	}

	public void setIdGruppo(Integer idGruppo) {
		this.idGruppo = idGruppo;
	}
}
