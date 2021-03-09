package com.app.spesecasa.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@Value("${custom.hostname}")
	private String testDbName;

	@GetMapping("/")
	String hello() {
		return "DB name: " + testDbName;
	}


}
