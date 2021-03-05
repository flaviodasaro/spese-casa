package com.app.spesecasa.dto.pagamenti;

import java.util.List;

public class RequestInserisciPagamentoMassivo  extends AbstractRequestInserisciPagamento {
	private List<SinglePaymentInfo> payments;

	public List<SinglePaymentInfo> getPayments() {
		return payments;
	}

	public void setPayments(List<SinglePaymentInfo> payments) {
		this.payments = payments;
	}
}
