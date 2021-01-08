package com.app.spesecasa.dto;

import javax.validation.constraints.NotNull;

public class RequestInserisciPagamentoSingolo extends AbstractRequestInserisciPagamento {

	@NotNull
	private SinglePaymentInfo singlePaymentInfo;

	public SinglePaymentInfo getSinglePaymentInfo() {
		return singlePaymentInfo;
	}

	public void setSinglePaymentInfo(SinglePaymentInfo singlePaymentInfo) {
		this.singlePaymentInfo = singlePaymentInfo;
	}
}
