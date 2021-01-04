package com.app.spesecasa.repository;

import com.app.spesecasa.entity.AssociazioneUtenteGruppo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssociazioneUtenteGruppoRepository extends JpaRepository<AssociazioneUtenteGruppo, Integer> {

	@Query(nativeQuery = true, value = "SELECT * FROM spese_casa.ass_utente_gruppo WHERE fk_gruppo = :idGruppo")
	List<AssociazioneUtenteGruppo> findByGruppo(@Param("idGruppo") Integer idGruppo);
}
