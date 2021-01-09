package com.app.spesecasa.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RequestGetPagamentiByFilters {

	private Integer idPagamento;
	private Integer idUtentePagante;
	private Integer idGruppoPartecipante;
	private Integer idCategoriaSpesa;
	private Boolean flgPagato;
	private BigDecimal importoMin;
	private BigDecimal importoMax;
	private String descrizione;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate tmsInserimentoMin;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate tmsInserimentoMax;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate tmsModificaMin;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate tmsModificaMax;

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

	public Boolean getFlgPagato() {
		return flgPagato;
	}

	public void setFlgPagato(Boolean flgPagato) {
		this.flgPagato = flgPagato;
	}

	public BigDecimal getImportoMin() {
		return importoMin;
	}

	public void setImportoMin(BigDecimal importoMin) {
		this.importoMin = importoMin;
	}

	public BigDecimal getImportoMax() {
		return importoMax;
	}

	public void setImportoMax(BigDecimal importoMax) {
		this.importoMax = importoMax;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public LocalDate getTmsInserimentoMin() {
		return tmsInserimentoMin;
	}

	public void setTmsInserimentoMin(LocalDate tmsInserimentoMin) {
		this.tmsInserimentoMin = tmsInserimentoMin;
	}

	public LocalDate getTmsInserimentoMax() {
		return tmsInserimentoMax;
	}

	public void setTmsInserimentoMax(LocalDate tmsInserimentoMax) {
		this.tmsInserimentoMax = tmsInserimentoMax;
	}

	public LocalDate getTmsModificaMin() {
		return tmsModificaMin;
	}

	public void setTmsModificaMin(LocalDate tmsModificaMin) {
		this.tmsModificaMin = tmsModificaMin;
	}

	public LocalDate getTmsModificaMax() {
		return tmsModificaMax;
	}

	public void setTmsModificaMax(LocalDate tmsModificaMax) {
		this.tmsModificaMax = tmsModificaMax;
	}
}
