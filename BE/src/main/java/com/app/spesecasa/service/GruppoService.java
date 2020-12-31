package com.app.spesecasa.service;

import com.app.spesecasa.entity.Gruppo;
import com.app.spesecasa.repository.GruppoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GruppoService {
	@Autowired
	private GruppoRepository gruppoRepository;

	public Gruppo getGruppoById(Integer id) {
		return gruppoRepository.findById(id).orElse(null);
	}

	public List<Gruppo> getAllGruppi() {
		return gruppoRepository.findAll();
	}

	public void insertGruppo(Gruppo g) {
		gruppoRepository.save(g);
	}

	public Gruppo insertAndGetGruppo(Gruppo g) {
		return gruppoRepository.save(g);
	}

	public void deleteGruppoById(Integer id) {
		gruppoRepository.deleteById(id);
	}


}
