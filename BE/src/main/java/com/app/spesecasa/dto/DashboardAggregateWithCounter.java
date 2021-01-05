package com.app.spesecasa.dto;

import java.util.Objects;

public class DashboardAggregateWithCounter extends DashboardAggregateDto {
	private Integer counter;

	public DashboardAggregateWithCounter(Integer counter, Integer id, String name) {
		super(id, name);
		this.counter = counter;

	}

	public Integer getCounter() {
		return counter;
	}

	public void setCounter(Integer counter) {
		this.counter = counter;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof DashboardAggregateWithCounter))
			return false;
		if (!super.equals(o))
			return false;
		DashboardAggregateWithCounter that = (DashboardAggregateWithCounter) o;
		return Objects.equals(counter, that.counter);
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), counter);
	}
}
