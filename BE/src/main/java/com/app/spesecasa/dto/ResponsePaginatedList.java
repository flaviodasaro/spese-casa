package com.app.spesecasa.dto;

import java.util.List;

public class ResponsePaginatedList {
	private List<?> list;
	private Integer totalElements;

	public ResponsePaginatedList(List<?> list, Integer totalElements) {
		this.list = list;
		this.totalElements = totalElements;
	}

	public ResponsePaginatedList(List<?> list) {
		this(list, list.size());
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	public Integer getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(Integer totalElements) {
		this.totalElements = totalElements;
	}
}
