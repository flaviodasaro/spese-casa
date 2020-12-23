package com.app.spesecasa.repository;

import com.app.spesecasa.entity.SaldoParziale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaldoParzialeRepository extends JpaRepository<SaldoParziale, Integer> {
}
