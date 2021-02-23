package com.app.spesecasa.entity;

import com.app.spesecasa.dto.InquiryForArchiveDto;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(schema = "spese_casa", name="utente")
@SqlResultSetMapping(name = "Utente.GET_ALL_USERS_WITH_SINGLE_GROUP", classes = {
		@ConstructorResult(targetClass = InquiryForArchiveDto.class, columns = {
				@ColumnResult(name = "ID_UTENTE", type = Integer.class),
				@ColumnResult(name = "FK_GRUPPO", type = Integer.class)
		}) })
@NamedNativeQuery(query = Utente.GET_ALL_USERS_WITH_SINGLE_GROUP, resultSetMapping = "Utente.GET_ALL_USERS_WITH_SINGLE_GROUP", name = "Utente.getUsersWithSingleGroup")
public class Utente implements Serializable {

	private static final long serialVersionUID = -6735334764088375966L;

	static final String GET_ALL_USERS_WITH_SINGLE_GROUP = "SELECT ID_UTENTE, FK_GRUPPO FROM spese_casa.utente u  inner join spese_casa.ass_utente_gruppo ass on u.id_utente = ass.fk_utente  where ass.fk_gruppo in (select ass.fk_gruppo from spese_casa.ass_utente_gruppo ass group by ass.fk_gruppo having count(*) = 1)";

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_utente")
	private Integer idUtente;

	@Column(name = "username")
	@NotNull
	@Size(max = 45)
	private String username;

	@Column(name = "tms_inserimento")
	private Timestamp tmsInserimento;

	public Integer getIdUtente() {
		return idUtente;
	}

	public void setIdUtente(Integer idUtente) {
		this.idUtente = idUtente;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Timestamp getTmsInserimento() {
		return tmsInserimento;
	}

	@PrePersist
	public void setTmsInserimento() {
		this.tmsInserimento = Timestamp.valueOf(LocalDateTime.now());
	}
}
