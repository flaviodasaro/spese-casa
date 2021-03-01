package com.app.spesecasa.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

@Service
public class FileService {

	public String getTxtContent(String path, String fileName) throws FileNotFoundException {
		File file = new File(String.format("%s/%s", path, fileName));
		Scanner myReader = new Scanner(file);
		StringBuilder sb = new StringBuilder();
		while (myReader.hasNextLine()) {
			String data = myReader.nextLine();
			sb.append(data).append("\n");
		}
		myReader.close();
		return sb.toString();
	}

	public void writeTxtContent(String fileContent, String path, String fileName) throws IOException {
		String absolutePath = String.format("%s/%s", path, fileName);
		File file = new File(absolutePath);
		file.createNewFile();
		FileWriter myWriter = new FileWriter(file);
		myWriter.write(fileContent);
		myWriter.close();
	}
}
