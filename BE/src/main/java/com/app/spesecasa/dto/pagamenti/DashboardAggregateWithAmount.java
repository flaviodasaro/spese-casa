package com.app.spesecasa.dto.pagamenti;

import java.math.BigDecimal;
import java.util.Objects;

public class DashboardAggregateWithAmount extends DashboardAggregateDto {
	private BigDecimal importo;

	public DashboardAggregateWithAmount(BigDecimal importo, Integer id, String name) {
		super(id, name);
		this.importo = importo;

	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof DashboardAggregateWithAmount))
			return false;
		if (!super.equals(o))
			return false;
		DashboardAggregateWithAmount that = (DashboardAggregateWithAmount) o;
		return Objects.equals(importo, that.importo);
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), importo);
	}
}