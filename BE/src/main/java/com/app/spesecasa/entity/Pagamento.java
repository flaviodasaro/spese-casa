package com.app.spesecasa.entity;

import com.app.spesecasa.dto.GetTotAvereDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(schema = "spese_casa", name = "pagamento")
@SqlResultSetMapping(name = "Pagamento.QUERY_GET_TOTAVERE", classes = {
		@ConstructorResult(targetClass = GetTotAvereDto.class, columns = {
				@ColumnResult(name = "TOT_AVERE", type = BigDecimal.class) }) })
@NamedNativeQuery(query = Pagamento.QUERY_GET_TOTAVERE, resultSetMapping = "Pagamento.QUERY_GET_TOTAVERE", name = "Pagamento.getTotAvereByUtenti")
public class Pagamento implements Serializable {

	private static final long serialVersionUID = -2163362903449232549L;

	private static final String QUERY1 = "SELECT (sum(p1.importo) / (SELECT COUNT(*) FROM ass_utente_gruppo ass WHERE ass.fk_gruppo = p1.gruppo_partecipante) ) as quota_da_ricevere, 0 as quota_da_pagare " +
			"FROM spese_casa.pagamento p1 " +
			"WHERE p1.flg_pagato = 0 and p1.utente_pagante = :idUtente1 and p1.gruppo_partecipante in ( select distinct fk_gruppo from ass_utente_gruppo ass1 where ass1.fk_utente = :idUtente2 ) " +
			"GROUP BY p1.utente_pagante, p1.gruppo_partecipante ";

	private static final String QUERY2 = "SELECT 0 as quota_da_ricevere, (sum(p2.importo) / (SELECT COUNT(*) FROM ass_utente_gruppo ass WHERE ass.fk_gruppo = p2.gruppo_partecipante) ) as quota_da_pagare " +
			"FROM spese_casa.pagamento p2 " +
			"WHERE p2.flg_pagato = 0 and p2.utente_pagante = :idUtente3 and p2.gruppo_partecipante in ( select distinct fk_gruppo from ass_utente_gruppo ass2 where ass2.fk_utente = :idUtente4 ) " +
			"GROUP BY p2.utente_pagante, p2.gruppo_partecipante ";

	static final String QUERY_GET_TOTAVERE = " SELECT sum( quota_da_ricevere ) - sum( quota_da_pagare ) as TOT_AVERE FROM ( ( " + QUERY1 + " ) UNION ( " + QUERY2 + " )  ) AS TMP_TABLE";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pagamento")
	private Integer idPagamento;

	@ManyToOne
	@JoinColumn(name = "utente_pagante")
	@NotNull
	private Utente utentePagante;

	@ManyToOne
	@JoinColumn(name = "gruppo_partecipante")
	@NotNull
	private Gruppo gruppoPartecipante;

	@ManyToOne
	@JoinColumn(name = "id_categoria_spesa")
	@NotNull
	private CategoriaSpesa categoriaSpesa;

	@NotNull
	@Column(name = "flg_pagato")
	private Boolean flgPagato;

	@Column(name = "importo", precision = 15, scale = 2)
	private BigDecimal importo;

	@Column(name = "tms_inserimento")
	private Timestamp tmsInserimento;

	@Column(name = "tms_modifica")
	private Timestamp tmsModifica;

	public Integer getIdPagamento() {
		return idPagamento;
	}

	public void setIdPagamento(Integer idPagamento) {
		this.idPagamento = idPagamento;
	}

	public Utente getUtentePagante() {
		return utentePagante;
	}

	public void setUtentePagante(Utente utentePagante) {
		this.utentePagante = utentePagante;
	}

	public Gruppo getGruppoPartecipante() {
		return gruppoPartecipante;
	}

	public void setGruppoPartecipante(Gruppo gruppoPartecipante) {
		this.gruppoPartecipante = gruppoPartecipante;
	}

	public CategoriaSpesa getCategoriaSpesa() {
		return categoriaSpesa;
	}

	public void setCategoriaSpesa(CategoriaSpesa categoriaSpesa) {
		this.categoriaSpesa = categoriaSpesa;
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

	public Timestamp getTmsInserimento() {
		return tmsInserimento;
	}

	@PrePersist
	public void setTmsInserimento() {
		this.tmsInserimento = Timestamp.valueOf(LocalDateTime.now());
	}

	public Timestamp getTmsModifica() {
		return tmsModifica;
	}

	@PreUpdate
	public void setTmsModifica() {
		this.tmsModifica = Timestamp.valueOf(LocalDateTime.now());
	}
}