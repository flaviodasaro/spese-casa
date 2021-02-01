package com.app.spesecasa.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@GetMapping("/")
	String hello() {
		return "This tutorial is the best. All hail the great Kristijan.";
	}


}
