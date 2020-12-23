package com.app.spesecasa.dto;

import java.math.BigDecimal;

public class GetTotAvereDto {
	private BigDecimal totAvere;

	public GetTotAvereDto(BigDecimal totAvere) {
		this.totAvere = totAvere;
	}

	public BigDecimal getTotAvere() {
		return totAvere;
	}

	public void setTotAvere(BigDecimal totAvere) {
		this.totAvere = totAvere;
	}
}
