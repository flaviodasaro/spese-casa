package com.app.spesecasa.repository;

import com.app.spesecasa.entity.Gruppo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GruppoRepository extends JpaRepository<Gruppo, Integer> {
}
