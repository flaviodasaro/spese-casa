package com.app.spesecasa.dto;

public class InquiryForArchiveDto {
	private Integer idUtente;
	private Integer idGruppo;

	public InquiryForArchiveDto(Integer idUtente, Integer idGruppo) {
		this.idUtente = idUtente;
		this.idGruppo = idGruppo;
	}

	public Integer getIdUtente() {
		return idUtente;
	}

	public void setIdUtente(Integer idUtente) {
		this.idUtente = idUtente;
	}

	public Integer getIdGruppo() {
		return idGruppo;
	}

	public void setIdGruppo(Integer idGruppo) {
		this.idGruppo = idGruppo;
	}
}
