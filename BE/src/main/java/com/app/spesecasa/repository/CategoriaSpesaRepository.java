package com.app.spesecasa.repository;

import com.app.spesecasa.entity.CategoriaSpesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaSpesaRepository extends JpaRepository<CategoriaSpesa, Integer> {
}
