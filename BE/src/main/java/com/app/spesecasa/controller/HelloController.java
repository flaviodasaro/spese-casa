package com.app.spesecasa.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/hello")
public class HelloController {

	@GetMapping("/test-get")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
