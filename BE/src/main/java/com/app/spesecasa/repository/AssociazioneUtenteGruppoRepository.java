package com.app.spesecasa.repository;

import com.app.spesecasa.entity.AssociazioneUtenteGruppo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociazioneUtenteGruppoRepository extends JpaRepository<AssociazioneUtenteGruppo, Integer> {
}
