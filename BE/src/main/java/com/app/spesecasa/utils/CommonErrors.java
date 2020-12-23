package com.app.spesecasa.utils;

public class CommonErrors {

	private static final String FORMAT_UTENTE_NOT_FOUND = "Utente con id %s non trovato";
	private static final String FORMAT_GRUPPO_NOT_FOUND = "Gruppo con id %s non trovato";
	private static final String FORMAT_PAGAMENTO_NOT_FOUND = "Pagamento con id %s non trovato";

	public static void throwExeptionUtenteNotFound(Integer id){
		throw new CommonRunTimeException(String.format(FORMAT_UTENTE_NOT_FOUND, id), Constants.UTENTE_NOT_FOUND);
	}
	public static void throwExeptionGruppoNotFound(Integer id){
		throw new CommonRunTimeException(String.format(FORMAT_GRUPPO_NOT_FOUND, id), Constants.GRUPPO_NOT_FOUND);
	}
	public static void throwExeptionPagamentoNotFound(Integer id){
		throw new CommonRunTimeException(String.format(FORMAT_PAGAMENTO_NOT_FOUND, id), Constants.PAGAMENTO_NOT_FOUND);
	}
}
