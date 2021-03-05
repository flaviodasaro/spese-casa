package com.app.spesecasa.dto.pagamenti;

import com.app.spesecasa.dto.pagamenti.DashboardAggregateWithAmount;
import com.app.spesecasa.dto.pagamenti.DashboardAggregateWithCounter;

public class ResponseGetDashboardInit {
	private DashboardAggregateWithCounter utentePagatoPiuVolte;
	private DashboardAggregateWithCounter gruppoPartecipatoPiuVolte;
	private DashboardAggregateWithAmount utenteBigPay;

	public DashboardAggregateWithCounter getUtentePagatoPiuVolte() {
		return utentePagatoPiuVolte;
	}

	public void setUtentePagatoPiuVolte(DashboardAggregateWithCounter utentePagatoPiuVolte) {
		this.utentePagatoPiuVolte = utentePagatoPiuVolte;
	}

	public DashboardAggregateWithCounter getGruppoPartecipatoPiuVolte() {
		return gruppoPartecipatoPiuVolte;
	}

	public void setGruppoPartecipatoPiuVolte(DashboardAggregateWithCounter gruppoPartecipatoPiuVolte) {
		this.gruppoPartecipatoPiuVolte = gruppoPartecipatoPiuVolte;
	}

	public DashboardAggregateWithAmount getUtenteBigPay() {
		return utenteBigPay;
	}

	public void setUtenteBigPay(DashboardAggregateWithAmount utenteBigPay) {
		this.utenteBigPay = utenteBigPay;
	}
}
