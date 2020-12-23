package com.app.spesecasa.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(schema = "spese_casa", name="ass_utente_gruppo")
public class AssociazioneUtenteGruppo implements Serializable {

	private static final long serialVersionUID = -7701535833017940423L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_ass_utente_gruppo")
	private Integer idAssociazioneUtenteGruppo;

	@ManyToOne
	@JoinColumn(name = "fk_utente")
	private Utente utente;

	@ManyToOne
	@JoinColumn(name = "fk_gruppo")
	private Gruppo gruppo;

	@Column(name = "tms_inserimento")
	private Timestamp tmsInserimento;

	public Integer getIdAssociazioneUtenteGruppo() {
		return idAssociazioneUtenteGruppo;
	}

	public void setIdAssociazioneUtenteGruppo(Integer idAssociazioneUtenteGruppo) {
		this.idAssociazioneUtenteGruppo = idAssociazioneUtenteGruppo;
	}

	public Utente getUtente() {
		return utente;
	}

	public void setUtente(Utente utente) {
		this.utente = utente;
	}

	public Gruppo getGruppo() {
		return gruppo;
	}

	public void setGruppo(Gruppo gruppo) {
		this.gruppo = gruppo;
	}

	public Timestamp getTmsInserimento() {
		return tmsInserimento;
	}

	@PrePersist
	public void setTmsInserimento() {
		this.tmsInserimento = Timestamp.valueOf(LocalDateTime.now());
	}
}
