package com.app.spesecasa.repository;

import com.app.spesecasa.dto.InquiryForArchiveDto;
import com.app.spesecasa.entity.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Integer> {

	@Query(nativeQuery = true, value = "SELECT count(*) FROM spese_casa.utente")
	Integer getUsersCount();

	@Query(nativeQuery = true)
	List<InquiryForArchiveDto> getUsersWithSingleGroup();
}
