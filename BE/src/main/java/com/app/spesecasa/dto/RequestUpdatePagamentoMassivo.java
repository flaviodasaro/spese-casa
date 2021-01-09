package com.app.spesecasa.dto;

import java.util.List;

public class RequestUpdatePagamentoMassivo {
	private List<RequestUpdatePagamento> list;

	public List<RequestUpdatePagamento> getList() {
		return list;
	}

	public void setList(List<RequestUpdatePagamento> list) {
		this.list = list;
	}
}
