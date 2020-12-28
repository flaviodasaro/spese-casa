package com.app.spesecasa.repository;

import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.entity.SaldoParziale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaldoParzialeRepository extends JpaRepository<SaldoParziale, Integer> {

	@Query(nativeQuery = true)
	List<GetTotAvereDto> getTotAvereSaldoByUtenti(@Param("idUtentePagamento") Integer idUtentePagamento, @Param("idUtenteSaldo")  Integer idUtenteSaldo);
}
