package com.app.spesecasa.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class RequestAddGroupAndAssociations {

	@NotNull
	private String groupName;


	@Size(min = 1)
	@NotNull
	private List<Integer> users;

	private String groupNotes;

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public List<Integer> getUsers() {
		return users;
	}

	public void setUsers(List<Integer> users) {
		this.users = users;
	}

	public String getGroupNotes() {
		return groupNotes;
	}

	public void setGroupNotes(String groupNotes) {
		this.groupNotes = groupNotes;
	}
}
