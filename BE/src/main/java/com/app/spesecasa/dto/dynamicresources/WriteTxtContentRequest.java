package com.app.spesecasa.dto.dynamicresources;

import javax.validation.constraints.NotNull;

public class WriteTxtContentRequest {
	@NotNull
	private String fileContent;
	@NotNull
	private String fileName;

	public String getFileContent() {
		return fileContent;
	}

	public void setFileContent(String fileContent) {
		this.fileContent = fileContent;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
