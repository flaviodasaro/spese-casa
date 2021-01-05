package com.app.spesecasa.repository;

import com.app.spesecasa.dto.DashboardAggregateWithAmount;
import com.app.spesecasa.dto.DashboardAggregateWithCounter;
import com.app.spesecasa.dto.GetTotAvereDto;
import com.app.spesecasa.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {

	@Query(nativeQuery = true)
	List<GetTotAvereDto> getTotAvereByUtenti(@Param("idUtente1") Integer idUtente1, @Param("idUtente2")  Integer idUtente2, @Param("idUtente3") Integer idUtente3, @Param("idUtente4")  Integer idUtente4);

	@Query(nativeQuery = true)
	List<DashboardAggregateWithCounter> getDashboadrAggregateUtentePagatoPiuVolte();

	@Query(nativeQuery = true)
	List<DashboardAggregateWithCounter> getDashboadrAggregateGruppoPartecipatoPiuVolte();

	@Query(nativeQuery = true)
	List<DashboardAggregateWithAmount> getDashboadrAggregateutenteBigPay();
}
