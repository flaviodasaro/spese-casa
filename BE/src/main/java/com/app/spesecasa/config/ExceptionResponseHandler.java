package com.app.spesecasa.config;

import com.app.spesecasa.utils.CommonRunTimeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionResponseHandler extends ResponseEntityExceptionHandler {

	@Value("${custom.exceptions.returnStackTrace}")
	private boolean returnStackTrace;

	@ExceptionHandler(value = { CommonRunTimeException.class })
	protected ResponseEntity<Object> handleConflict(
			CommonRunTimeException e, WebRequest request) {
		return handleExceptionInternal(e, e.getBody(returnStackTrace),
				new HttpHeaders(), e.getHttpStatus(), request);
	}

}


