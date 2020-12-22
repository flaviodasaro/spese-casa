package com.app.spesecasa.utils;

import com.app.spesecasa.dto.ErrorBodyResponse;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class CommonRunTimeException extends RuntimeException {

	private HttpStatus httpStatus;
	private LocalDateTime tms;
	private String errorCode;
	private String customMessage;

	public CommonRunTimeException(String message, HttpStatus httpStatus, String errorCode) {
		super(message);
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.tms = LocalDateTime.now();
	}

	public CommonRunTimeException(String message) {
		this(message, HttpStatus.INTERNAL_SERVER_ERROR,  Constants.GENERIC_ERROR_CODE);
	}

	public CommonRunTimeException(String message, String errorCode) {
		this(message, HttpStatus.INTERNAL_SERVER_ERROR, errorCode);
	}

	public CommonRunTimeException(String customMessage, Throwable cause, HttpStatus httpStatus, String errorCode) {
		super(cause);
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
		this.customMessage = customMessage;
		this.tms = LocalDateTime.now();
		cause.printStackTrace();
	}

	public CommonRunTimeException(Throwable cause) {
		this(null, cause, HttpStatus.INTERNAL_SERVER_ERROR, Constants.GENERIC_ERROR_CODE);
	}

	public Object getBody(boolean returnAllStackTrace){
		return new ErrorBodyResponse(this.httpStatus, this.tms, this.getMessage(), this.customMessage, this.errorCode,
				returnAllStackTrace ? this.getStackTrace(): null);
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

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getCustomMessage() {
		return customMessage;
	}

	public void setCustomMessage(String customMessage) {
		this.customMessage = customMessage;
	}
}
