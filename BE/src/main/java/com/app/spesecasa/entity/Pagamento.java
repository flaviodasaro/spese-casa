package com.app.spesecasa.entity;

import com.app.spesecasa.dto.DashboardAggregateWithAmount;
import com.app.spesecasa.dto.DashboardAggregateWithCounter;
import com.app.spesecasa.dto.GetTotAvereDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

/**
 * ,
 *
 * @ConstructorResult(targetClass = DashboardAggregateWithCounter.class, columns = {
 * @ColumnResult(name = "counter", type = Integer.class),
 * @ColumnResult(name = "id", type = Integer.class),
 * @ColumnResult(name = "name", type = String.class)
 * }),
 * @ConstructorResult(targetClass = DashboardAggregateWithCounter.class, columns = {}),
 * @ConstructorResult(targetClass = DashboardAggregateWithAmount.class, columns = {})
 */
@Entity
@Table(schema = "spese_casa", name = "pagamento")
@SqlResultSetMapping(name = "Pagamento.QUERY_GET_TOTAVERE", classes = {
		@ConstructorResult(targetClass = GetTotAvereDto.class, columns = {
				@ColumnResult(name = "TOT_AVERE", type = BigDecimal.class) }) })
@SqlResultSetMapping(name = "Pagamento.QUERY_GET_AGGREGATE_COUNTER", classes = {
		@ConstructorResult(targetClass = DashboardAggregateWithCounter.class, columns = {
				@ColumnResult(name = "counter", type = Integer.class), @ColumnResult(name = "id", type = Integer.class),
				@ColumnResult(name = "name", type = String.class) }) })
@SqlResultSetMapping(name = "Pagamento.QUERY_GET_AGGREGATE_AMOUNT", classes = {
		@ConstructorResult(targetClass = DashboardAggregateWithAmount.class, columns = {
				@ColumnResult(name = "amount", type = BigDecimal.class), @ColumnResult(name = "id", type = Integer.class),
				@ColumnResult(name = "name", type = String.class) }) })
@NamedNativeQuery(query = Pagamento.QUERY_GET_TOTAVERE, resultSetMapping = "Pagamento.QUERY_GET_TOTAVERE", name = "Pagamento.getTotAvereByUtenti")
@NamedNativeQuery(query = Pagamento.QUERY_GET_UTENTE_PAGATO_PIU_VOLTE, resultSetMapping = "Pagamento.QUERY_GET_AGGREGATE_COUNTER", name = "Pagamento.getDashboadrAggregateUtentePagatoPiuVolte")
@NamedNativeQuery(query = Pagamento.QUERY_GET_GRUPPO_PARTECIPATO_PIU_VOLTE, resultSetMapping = "Pagamento.QUERY_GET_AGGREGATE_COUNTER", name = "Pagamento.getDashboadrAggregateGruppoPartecipatoPiuVolte")
@NamedNativeQuery(query = Pagamento.QUERY_UTENTE_DANIEL, resultSetMapping = "Pagamento.QUERY_GET_AGGREGATE_AMOUNT", name = "Pagamento.getDashboadrAggregateutenteBigPay")
public class Pagamento implements Serializable {

	private static final long serialVersionUID = -2163362903449232549L;

	static final String QUERY_GET_UTENTE_PAGATO_PIU_VOLTE = "SELECT MAX(counter) as counter, tmp.utente_pagante as id, ut.username as name " + "FROM (SELECT utente_pagante, count(*) as counter FROM spese_casa.pagamento GROUP BY utente_pagante ) as tmp " + "INNER JOIN spese_casa.utente ut on ut.id_utente = tmp.utente_pagante";
	static final String QUERY_GET_GRUPPO_PARTECIPATO_PIU_VOLTE = "SELECT MAX(counter) as counter, tmp.gruppo_partecipante as id, gr.nome_gruppo as name " + "FROM (SELECT gruppo_partecipante, count(*) as counter FROM spese_casa.pagamento GROUP BY gruppo_partecipante ) as tmp " + "INNER JOIN spese_casa.gruppo gr on gr.id_gruppo = tmp.gruppo_partecipante";
	static final String QUERY_UTENTE_DANIEL = "SELECT MAX(importo) as amount, p.utente_pagante as id, ut.username as name " + "FROM spese_casa.pagamento p " + "INNER JOIN spese_casa.utente ut on ut.id_utente = p.utente_pagante " + "where utente_pagante <> ( SELECT id FROM ( " + QUERY_GET_UTENTE_PAGATO_PIU_VOLTE + " ) as tmp ) ";

	private static final String QUERY1 = "SELECT (sum(p1.importo) / (SELECT COUNT(*) FROM ass_utente_gruppo ass WHERE ass.fk_gruppo = p1.gruppo_partecipante) ) as quota_da_ricevere, 0 as quota_da_pagare " + "FROM spese_casa.pagamento p1 " + "WHERE p1.flg_pagato = 0 and p1.utente_pagante = :idUtente1 and p1.gruppo_partecipante in ( select distinct fk_gruppo from ass_utente_gruppo ass1 where ass1.fk_utente = :idUtente2 ) " + "GROUP BY p1.utente_pagante, p1.gruppo_partecipante ";
	private static final String QUERY2 = "SELECT 0 as quota_da_ricevere, (sum(p2.importo) / (SELECT COUNT(*) FROM ass_utente_gruppo ass WHERE ass.fk_gruppo = p2.gruppo_partecipante) ) as quota_da_pagare " + "FROM spese_casa.pagamento p2 " + "WHERE p2.flg_pagato = 0 and p2.utente_pagante = :idUtente3 and p2.gruppo_partecipante in ( select distinct fk_gruppo from ass_utente_gruppo ass2 where ass2.fk_utente = :idUtente4 ) " + "GROUP BY p2.utente_pagante, p2.gruppo_partecipante ";
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

	@Column(name = "descrizione")
	private String descrizione;

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

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
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
