package com.app.spesecasa.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(schema = "spese_casa", name="saldo_parziale")
public class SaldoParziale implements Serializable {

	private static final long serialVersionUID = 5762187537385150215L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_saldo_parziale")
	private Integer idSaldoParziale;

	@ManyToOne
	@JoinColumn(name = "utente_pagante")
	@NotNull
	private Utente utentePagante;

	@ManyToOne
	@JoinColumn(name = "fk_pagamento")
	@NotNull
	private Pagamento fkPagamento;

	@Column(name = "importo")
	@NotNull
	private BigDecimal importo;

	@Column(name = "tms_inserimento")
	private Timestamp tmsInserimento;

	public Integer getIdSaldoParziale() {
		return idSaldoParziale;
	}

	public void setIdSaldoParziale(Integer idSaldoParziale) {
		this.idSaldoParziale = idSaldoParziale;
	}

	public Utente getUtentePagante() {
		return utentePagante;
	}

	public void setUtentePagante(Utente utentePagante) {
		this.utentePagante = utentePagante;
	}

	public Pagamento getFkPagamento() {
		return fkPagamento;
	}

	public void setFkPagamento(Pagamento fkPagamento) {
		this.fkPagamento = fkPagamento;
	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}

	public Timestamp getTmsInserimento() {
		return tmsInserimento;
	}

	@PrePersist
	public void setTmsInserimento() {
		this.tmsInserimento = Timestamp.valueOf(LocalDateTime.now());
	}
}
