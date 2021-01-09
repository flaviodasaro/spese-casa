package com.app.spesecasa.repository;

import com.app.spesecasa.dto.DashboardAggregateWithAmount;
import com.app.spesecasa.dto.DashboardAggregateWithCounter;
import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {

	@Query(nativeQuery = true)
	List<GetTotAvereDto> getTotAvereByUtenti(@Param("idUtente1") Integer idUtente1,
			@Param("idUtente2") Integer idUtente2, @Param("idUtente3") Integer idUtente3,
			@Param("idUtente4") Integer idUtente4);

	@Query(nativeQuery = true)
	List<DashboardAggregateWithCounter> getDashboadrAggregateUtentePagatoPiuVolte();

	@Query(nativeQuery = true)
	List<DashboardAggregateWithCounter> getDashboadrAggregateGruppoPartecipatoPiuVolte();

	@Query(nativeQuery = true)
	List<DashboardAggregateWithAmount> getDashboadrAggregateutenteBigPay();

	@Query(nativeQuery = true, value = "SELECT * FROM spese_casa.pagamento p WHERE 1=1 " +
			"AND ( :idPagamento IS NULL OR p.id_pagamento = :idPagamento ) " +
			"AND ( :idUtentePagante IS NULL OR p.utente_pagante = :idUtentePagante ) " +
			"AND ( :idGruppoPartecipante IS NULL OR p.gruppo_partecipante = :idGruppoPartecipante ) " +
			"AND ( :idCategoriaSpesa IS NULL OR p.id_categoria_spesa = :idCategoriaSpesa ) " +
			"AND ( :flgPagato IS NULL OR p.flg_pagato = :flgPagato ) " +
			"AND ( :importoMin IS NULL OR p.importo >= :importoMin ) " +
			"AND ( :importoMax IS NULL OR p.importo <= :importoMax ) " +
			"AND ( :descrizione IS NULL OR UPPER(p.descrizione) like :descrizione ) " +
			"AND ( :tmsInserimentoMin IS NULL OR p.tms_inserimento >= :tmsInserimentoMin ) " +
			"AND ( :tmsInserimentoMax IS NULL OR p.tms_inserimento <= :tmsInserimentoMax ) " +
			"AND ( :tmsModificaMin IS NULL OR p.tms_modifica >= :tmsModificaMin ) " +
			"AND ( :tmsModificaMax IS NULL OR p.tms_modifica <= :tmsModificaMax ) " +
			"")
	List<Pagamento> getPagamentiByFilters(@Param("idPagamento") Integer idPagamento,
			@Param("idUtentePagante") Integer idUtentePagante,
			@Param("idGruppoPartecipante") Integer idGruppoPartecipante,
			@Param("idCategoriaSpesa") Integer idCategoriaSpesa,
			@Param("flgPagato") Boolean flgPagato,
			@Param("importoMin") BigDecimal importoMin,
			@Param("importoMax") BigDecimal importoMax,
			@Param("descrizione") String descrizione,
			@Param("tmsInserimentoMin") LocalDate tmsInserimentoMin,
			@Param("tmsInserimentoMax") LocalDateTime tmsInserimentoMax,
			@Param("tmsModificaMin") LocalDate tmsModificaMin,
			@Param("tmsModificaMax") LocalDateTime tmsModificaMax
	);
}
