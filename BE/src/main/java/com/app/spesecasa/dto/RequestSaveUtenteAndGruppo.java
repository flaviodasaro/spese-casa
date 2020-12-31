package com.app.spesecasa.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RequestSaveUtenteAndGruppo {

	@NotNull
	@Size(min = 1, max = 45)
	private String username;

	private Boolean addGroupWothSingleUserToo;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getAddGroupWothSingleUserToo() {
		return addGroupWothSingleUserToo;
	}

	public void setAddGroupWothSingleUserToo(Boolean addGroupWothSingleUserToo) {
		this.addGroupWothSingleUserToo = addGroupWothSingleUserToo;
	}
}
