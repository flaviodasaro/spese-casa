package com.app.spesecasa.dto;

import java.io.Serializable;
import java.util.Objects;

public class DiffsByUtentiDto implements Serializable {

	private static final long serialVersionUID = 8155027146917162435L;

	private Integer utente1;
	private Integer utente2;
	private GetTotAvereDto getTotAvereDto;

	public DiffsByUtentiDto(Integer utente1, Integer utente2, GetTotAvereDto getTotAvereDto) {
		this.utente1 = utente1;
		this.utente2 = utente2;
		this.getTotAvereDto = getTotAvereDto;
	}

	public Integer getUtente1() {
		return utente1;
	}

	public void setUtente1(Integer utente1) {
		this.utente1 = utente1;
	}

	public Integer getUtente2() {
		return utente2;
	}

	public void setUtente2(Integer utente2) {
		this.utente2 = utente2;
	}

	public GetTotAvereDto getGetTotAvereDto() {
		return getTotAvereDto;
	}

	public void setGetTotAvereDto(GetTotAvereDto getTotAvereDto) {
		this.getTotAvereDto = getTotAvereDto;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof DiffsByUtentiDto))
			return false;
		DiffsByUtentiDto that = (DiffsByUtentiDto) o;
		return Objects.equals(utente1, that.utente1) && Objects.equals(utente2, that.utente2) && Objects
				.equals(getTotAvereDto, that.getTotAvereDto);
	}

	@Override
	public int hashCode() {
		return Objects.hash(utente1, utente2, getTotAvereDto);
	}
}
