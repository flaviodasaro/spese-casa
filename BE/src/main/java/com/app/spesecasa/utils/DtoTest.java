package com.app.spesecasa.utils;

import org.apache.poi.ss.usermodel.Cell;

import java.util.function.BiConsumer;
import java.util.function.Function;

public class DtoTest {
	private String propertyName;
	private Function<Cell, ?> valueGetter;
	private BiConsumer<Cell, Exception> onError;

	public DtoTest(String propertyName, Function<Cell, ?> valueGetter) {
		this.propertyName = propertyName;
		this.valueGetter = valueGetter;
	}

	public DtoTest(String propertyName, Function<Cell, ?> valueGetter, BiConsumer<Cell, Exception> onError) {
		this.propertyName = propertyName;
		this.valueGetter = valueGetter;
		this.onError = onError;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public Function<Cell, ?> getValueGetter() {
		return valueGetter;
	}

	public void setValueGetter(Function<Cell, ?> valueGetter) {
		this.valueGetter = valueGetter;
	}

	public BiConsumer<Cell, Exception> getOnError() {
		return onError;
	}

	public void setOnError(BiConsumer<Cell, Exception> onError) {
		this.onError = onError;
	}
}
