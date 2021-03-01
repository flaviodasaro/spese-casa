package com.app.spesecasa.controller;

import com.app.spesecasa.dto.dynamicresources.WriteTxtContentRequest;
import com.app.spesecasa.service.FileService;
import com.app.spesecasa.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/dynamic-resources")
@CrossOrigin("*")
@Validated
public class DynamicResourcesController {

	@Value("${custom.dynamic-resources.path}")
	private String path;

	@Autowired
	private FileService fileService;

	@GetMapping("/get-txt-content")
	public ResponseEntity<String> getTxtContent(@RequestParam String fileName){
		try{
			return ResponseEntity.ok(fileService.getTxtContent(path, fileName));
		}
		catch (Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}

	@PostMapping("write-txt-content")
	public ResponseEntity<Void> writeTxtContent(@RequestBody @Valid WriteTxtContentRequest body){
		try{
			fileService.writeTxtContent(body.getFileContent(), path, body.getFileName());
			return ResponseEntity.noContent().build();
		}
		catch(Exception e){
			Utils.handleCommonError(e);
			return null;
		}
	}
}
