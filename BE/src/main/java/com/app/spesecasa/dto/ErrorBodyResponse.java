package com.app.spesecasa.dto;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Arrays;

public class ErrorBodyResponse {
	private HttpStatus httpStatus;
	private LocalDateTime tms;
	private String message;
	private String customMessage;
	private String errorCode;
	private StackTraceElement[] stackTrace;

	public ErrorBodyResponse(HttpStatus httpStatus, LocalDateTime tms, String message, String customMessage, String errorCode,
			StackTraceElement[] stackTrace) {
		this.httpStatus = httpStatus;
		this.tms = tms;
		this.message = message;
		this.customMessage = customMessage;
		this.errorCode = errorCode;
		if(stackTrace != null){
			this.setStackTrace(stackTrace);
		}
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public LocalDateTime getTms() {
		return tms;
	}

	public void setTms(LocalDateTime tms) {
		this.tms = tms;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getCustomMessage() {
		return customMessage;
	}

	public void setCustomMessage(String customMessage) {
		this.customMessage = customMessage;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public StackTraceElement[] getStackTrace() {
		return stackTrace;
	}

	public void setStackTrace(StackTraceElement[] stackTrace) {
		this.stackTrace = Arrays.copyOf(stackTrace, stackTrace.length);
	}
}
