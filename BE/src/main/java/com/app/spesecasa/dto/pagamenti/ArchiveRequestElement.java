package com.app.spesecasa.dto.pagamenti;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class ArchiveRequestElement implements Serializable {

	private static final long serialVersionUID = 5720066031069566012L;

	@NotNull
	private Integer idUtenteBrv; //utente in positivo. utente pagante del futuro pagamento fittizio

	@NotNull
	private Integer idUtenteKtv; //utente in negativo. unico utente partecipante al futuro pagamento fittizio di cui sopra

	@NotNull
	@Min(0)
	private BigDecimal importo;

	public Integer getIdUtenteBrv() {
		return idUtenteBrv;
	}

	public void setIdUtenteBrv(Integer idUtenteBrv) {
		this.idUtenteBrv = idUtenteBrv;
	}

	public Integer getIdUtenteKtv() {
		return idUtenteKtv;
	}

	public void setIdUtenteKtv(Integer idUtenteKtv) {
		this.idUtenteKtv = idUtenteKtv;
	}

	public BigDecimal getImporto() {
		return importo;
	}

	public void setImporto(BigDecimal importo) {
		this.importo = importo;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof ArchiveRequestElement))
			return false;
		ArchiveRequestElement that = (ArchiveRequestElement) o;
		return Objects.equals(idUtenteBrv, that.idUtenteBrv) && Objects.equals(idUtenteKtv, that.idUtenteKtv) && Objects
				.equals(importo, that.importo);
	}

	@Override
	public int hashCode() {
		return Objects.hash(idUtenteBrv, idUtenteKtv, importo);
	}
}
