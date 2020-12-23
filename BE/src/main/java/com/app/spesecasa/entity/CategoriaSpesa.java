package com.app.spesecasa.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(schema = "spese_casa", name="sys_categoria_spesa")
public class CategoriaSpesa implements Serializable {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id_categoria_spesa")
	private Integer idCategoriaSpesa;

	@Column(name = "nome_categoria")
	@NotNull
	@Size(max = 15)
	private String nomeCategoria;

	@Column(name = "note_categoria")
	@Size(max = 150)
	private String noteCategoria;

	public Integer getIdCategoriaSpesa() {
		return idCategoriaSpesa;
	}

	public void setIdCategoriaSpesa(Integer idCategoriaSpesa) {
		this.idCategoriaSpesa = idCategoriaSpesa;
	}

	public String getNomeCategoria() {
		return nomeCategoria;
	}

	public void setNomeCategoria(String nomeCategoria) {
		this.nomeCategoria = nomeCategoria;
	}

	public String getNoteCategoria() {
		return noteCategoria;
	}

	public void setNoteCategoria(String noteCategoria) {
		this.noteCategoria = noteCategoria;
	}
}
