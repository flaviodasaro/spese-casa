package com.app.spesecasa.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(schema = "spese_casa", name="gruppo")
public class Gruppo implements Serializable {

	private static final long serialVersionUID = -919547574154035697L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_gruppo")
	private Integer idGruppo;

	@Column(name = "nome_gruppo")
	@NotNull
	@Size(max = 45)
	private String nomeGruppo;

	@Column(name = "note_gruppo")
	@Size(max = 150)
	private String noteGruppo;

	@Column(name = "tms_inserimento")
	private Timestamp tmsInserimento;

	public Integer getIdGruppo() {
		return idGruppo;
	}

	public void setIdGruppo(Integer idGruppo) {
		this.idGruppo = idGruppo;
	}

	public String getNomeGruppo() {
		return nomeGruppo;
	}

	public void setNomeGruppo(String nomeGruppo) {
		this.nomeGruppo = nomeGruppo;
	}

	public String getNoteGruppo() {
		return noteGruppo;
	}

	public void setNoteGruppo(String noteGruppo) {
		this.noteGruppo = noteGruppo;
	}

	public Timestamp getTmsInserimento() {
		return tmsInserimento;
	}

	@PrePersist
	public void setTmsInserimento() {
		this.tmsInserimento = Timestamp.valueOf(LocalDateTime.now());
	}
}
