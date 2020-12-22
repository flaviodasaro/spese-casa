package com.app.spesecasa.controller;

import com.app.spesecasa.entity.Utente;
import com.app.spesecasa.repository.UtenteRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UtenteControllerTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private UtenteRepository utenteRepository;

	@Test
	public void testGetUtente() throws Exception {
		Mockito.when(utenteRepository.findById(Mockito.anyInt())).thenReturn(Optional.of(new Utente()));

		mvc.perform(MockMvcRequestBuilders.get("/utente/4").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		Mockito.when(utenteRepository.findById(Mockito.anyInt())).thenReturn(Optional.ofNullable(null));

		mvc.perform(MockMvcRequestBuilders.get("/utente/1").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}

	@Test
	public void testGetAll() throws Exception {
		Utente utenteValido = new Utente();
		utenteValido.setIdUtente(1);
		utenteValido.setUsername("Mario Rossi");
		Mockito.when(utenteRepository.findAll()).thenReturn(Collections.singletonList(utenteValido));

		mvc.perform(MockMvcRequestBuilders.get("/utente/all").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
}
