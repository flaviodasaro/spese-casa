package com.app.spesecasa.dto;

import com.app.spesecasa.entity.Utente;

import java.math.BigDecimal;

public class ResponseGetTotSingoloUtente {
	private BigDecimal diff;
	private Utente utenteSaldante;

	public ResponseGetTotSingoloUtente(BigDecimal diff, Utente utenteSaldante) {
		this.diff = diff;
		this.utenteSaldante = utenteSaldante;
	}

	public BigDecimal getDiff() {
		return diff;
	}

	public void setDiff(BigDecimal diff) {
		this.diff = diff;
	}

	public Utente getUtenteSaldante() {
		return utenteSaldante;
	}

	public void setUtenteSaldante(Utente utenteSaldante) {
		this.utenteSaldante = utenteSaldante;
	}
}
