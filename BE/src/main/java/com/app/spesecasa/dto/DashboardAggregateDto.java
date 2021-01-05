package com.app.spesecasa.dto;

import java.util.Objects;

public class DashboardAggregateDto {
	protected Integer id;
	protected String name;

	public DashboardAggregateDto(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof DashboardAggregateDto))
			return false;
		DashboardAggregateDto that = (DashboardAggregateDto) o;
		return Objects.equals(id, that.id) && Objects.equals(name, that.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}
}
