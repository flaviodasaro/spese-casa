package com.app.spesecasa.utils;

public class Utils {
	public static void handleCommonError(Exception e){

		if(e instanceof CommonRunTimeException){
			throw (CommonRunTimeException)e;
		}
		else {
			throw new CommonRunTimeException(e); //construct generic error with htto status = 500
		}
	}
}
