package com.app.spesecasa.config;

import com.app.spesecasa.utils.CommonRunTimeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Set;

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

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException e, WebRequest request){
		Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
		String errorMessage = "";
		if (!violations.isEmpty()) {
			StringBuilder builder = new StringBuilder();
			violations.forEach(violation -> {
				String fieldName = violation.getPropertyPath().toString();
				builder.append("; ").append(fieldName).append(": ").append(violation.getMessage());
			});
			builder.delete(0, 1);
			errorMessage = builder.toString();
		} else {
			errorMessage = "ConstraintViolationException occured.";
		}
		return ResponseEntity.badRequest().body(errorMessage);
	}

}


