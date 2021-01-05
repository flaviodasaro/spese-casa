import { createSelector } from "reselect";

const homeSlice = state => state.homeReducer;

const getInitResponse = createSelector(
    homeSlice, state => state.initResponse
);

export const getUsernameUtentePagatoPiuVolte = createSelector(
    getInitResponse,
    response => response && response.utentePagatoPiuVolte && response.utentePagatoPiuVolte.name
);
export const getNameGruppoPartecipatoPiuVolte = createSelector(
    getInitResponse,
    response => response && response.gruppoPartecipatoPiuVolte && response.gruppoPartecipatoPiuVolte.name
);
export const getNameUtenteBigPay = createSelector(
    getInitResponse,
    response => response && response.utenteBigPay && response.utenteBigPay.name
);