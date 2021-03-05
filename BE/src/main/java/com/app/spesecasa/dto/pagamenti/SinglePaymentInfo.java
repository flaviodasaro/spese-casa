package com.app.spesecasa.dto.pagamenti;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class SinglePaymentInfo {
	@NotNull
	private Integer idCategoriaSpesa;
	@NotNull
	private BigDecimal importo;
	@Size(max = 70)
	private String descrizione;

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

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
}
