package com.app.spesecasa.utils;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FileUtils<T> {
	private static String FILEPATH = "src/main/resources/files/Output.xlsx";

	private Class<?> type;

	public FileUtils(Class<?> type) {
		this.type = type;
	}

	private Workbook getWorkBook(byte[] bytes) throws IOException {
		//Workbook workbook = null;
		File xlFile = new File(FILEPATH);
		if (!xlFile.exists()) {
			xlFile.createNewFile();
			try (FileOutputStream out = new FileOutputStream(xlFile)) {
				out.write(bytes);
			}
		}

		try (FileInputStream inputStream = new FileInputStream(xlFile)) {
			return WorkbookFactory.create(inputStream);
		}
	}

	private List<T> convertToObjects(Workbook wb, Class<?> rowClass, List<DtoTest> propertiesByIndex) {
		List<T> result = new ArrayList<>();
		int propertiesToMapLength = propertiesByIndex.size();
		wb.forEach(sheet -> sheet.forEach(row -> {
			if (row.getRowNum() > 1) {
				try {
					Constructor<?> cons1 = rowClass.getConstructor();
					Object r = cons1.newInstance();
					Method[] methods = r.getClass().getMethods();
					row.forEach(cell -> {
						int colIndex = cell.getColumnIndex();
						if (colIndex < propertiesToMapLength) {
							DtoTest prop = propertiesByIndex.get(colIndex);
							String propertyName = prop.getPropertyName();
							Arrays.stream(methods)
									.filter(method -> method.getName().equalsIgnoreCase("set" + propertyName))
									.findFirst().ifPresent(setter -> {
								try {
									setter.invoke(r, prop.getValueGetter().apply(cell));
								} catch (IllegalAccessException | InvocationTargetException e) {
									e.printStackTrace();
								}
							});
						}
					});
					result.add((T) r);

				} catch (InstantiationException  | InvocationTargetException | NoSuchMethodException | IllegalAccessException ex) {
					ex.printStackTrace(); //ok, basta non aggiungere alla lista
				}
			}

		}));

		return result;
	}

	public List<T> convertExcelToObjects(byte[] excelFileBody, List<DtoTest> propertiesByIndex) throws IOException {
		Workbook wb = getWorkBook(excelFileBody);
		return convertToObjects(wb, type, propertiesByIndex);
	}

}
