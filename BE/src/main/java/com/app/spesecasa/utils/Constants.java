package com.app.spesecasa.utils;

public class Constants {
	public static String ENTITY_PACKAGE = "com.app.spesecasa.entity";

	//ERRORS
	public static final String GENERIC_ERROR_CODE = "GENERIC.ERROR";
	public static final String UTENTE_NOT_FOUND = "UTENTE.NOT.FOUND";
	public static final String GRUPPO_NOT_FOUND = "GRUPPO.NOT.FOUND";
	public static final String CATEGORIA_SPESA_NOT_FOUND = "CATEGORIA-SPESA.NOT.FOUND";
	public static final String PAGAMENTO_NOT_FOUND = "PAGAMENTO.NOT.FOUND";
	public static final String UPDATE_PAGAMENTO_BAD_REQUEST = "UPDATE.PAGAMENTO.BAD.REQUEST";


	private static final long serialVersionUID = -2163362903449232549L;

	private static final String ALIAS_PAGAMENTO_1 = "P1";
	private static final String ALIAS_PAGAMENTO_2 = "P2";
	private static final String ID_UTENTE1 = ":idUtente1";
	private static final String ID_UTENTE2 = ":idUtente2";
	private static final String ALIAS_ASS1 = "ass1";
	private static final String ALIAS_ASS2 = "ass2";


	private static final String INNER_GET_QUOTA_QUERY = " ( sum(%s.importo) / GREATEST(1, (SELECT COUNT(*) FROM ass_utente_gruppo ass WHERE ass.fk_gruppo = %s.gruppo_partecipante) ) ) ";

	private static final String ALIAS_QUOTA_DA_RICEVERE = "quota_da_ricevere";
	private static final String ALIAS_QUOTA_DA_PAGARE = "quota_da_pagare";
	private static final String WRAPPER_INNER_QUERY = "SELECT %s as %s, 0 as %s FROM spese_casa.pagamento %s WHERE %s.flg_pagato = 0 and %s.utente_pagante = %s and %s.gruppo_partecipante in ( select distinct fk_gruppo from ass_utente_gruppo %s where %s.fk_utente = %s ";

	private static final String QUERY1 = String.format(WRAPPER_INNER_QUERY,
			String.format(INNER_GET_QUOTA_QUERY, ALIAS_PAGAMENTO_1, ALIAS_PAGAMENTO_1),
			ALIAS_QUOTA_DA_RICEVERE, ALIAS_QUOTA_DA_PAGARE, //END SELECT
			ALIAS_PAGAMENTO_1, //END FROM
			ALIAS_PAGAMENTO_1,ALIAS_PAGAMENTO_1,ID_UTENTE1,ALIAS_PAGAMENTO_1,ALIAS_ASS1,ALIAS_ASS1,ID_UTENTE2);

	private static final String QUERY2 = String.format(WRAPPER_INNER_QUERY,
			String.format(INNER_GET_QUOTA_QUERY, ALIAS_PAGAMENTO_2, ALIAS_PAGAMENTO_2),
			ALIAS_QUOTA_DA_PAGARE, ALIAS_QUOTA_DA_RICEVERE, //END SELECT
			ALIAS_PAGAMENTO_2, //END FROM
			ALIAS_PAGAMENTO_2,ALIAS_PAGAMENTO_2,ID_UTENTE2,ALIAS_PAGAMENTO_2,ALIAS_ASS2,ALIAS_ASS2,ID_UTENTE1);

	public static final String QUERY_GET_TOTAVERE = String.format(" SELECT sum( %s ) - sum( %s ) as totAvere FROM ( ( %s ) UNION ( %s )  ) AS TMP_TABLE",
			ALIAS_QUOTA_DA_RICEVERE, ALIAS_QUOTA_DA_PAGARE, QUERY1, QUERY2);

	public static final String QUERY_GET_TOTAVERE_2 = " SELECT sum( " + ALIAS_QUOTA_DA_RICEVERE +
			" ) - sum( " + ALIAS_QUOTA_DA_PAGARE +
			" ) as totAvere FROM ( ( " + QUERY1 +
			" ) UNION ( %" + QUERY2 +
			" )  ) AS TMP_TABLE";
}
