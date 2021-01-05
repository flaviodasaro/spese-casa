import { createSelector } from "reselect";

const homeSlice = state => state.homeReducer;

const getInitResponse = createSelector(homeSlice, state => state.initResponse);

const getName = obj => obj && obj.name;
const getValue = obj => obj && obj.counter;

const getUtentePagatoPiuVolte = createSelector(
  getInitResponse,
  response => response && response.utentePagatoPiuVolte
);
const getGruppoPartecipatoPiuVolte = createSelector(
  getInitResponse,
  response => response && response.gruppoPartecipatoPiuVolte
);
const getUtenteBigPay = createSelector(
  getInitResponse,
  response => response && response.utenteBigPay
);

const getNameUtentePagatoPiuVolte = createSelector(
  getUtentePagatoPiuVolte,
  getName
);
const getValueUtentePagatoPiuVolte = createSelector(
  getUtentePagatoPiuVolte,
  getValue
);
const getNameGruppoPartecipatoPiuVolte = createSelector(
  getGruppoPartecipatoPiuVolte,
  getName
);
const getValueGruppoPartecipatoPiuVolte = createSelector(
  getGruppoPartecipatoPiuVolte,
  getValue
);
const getNameUtenteBigPay = createSelector(getUtenteBigPay, getName);
const getValueUtenteBigPay = createSelector(
  getUtenteBigPay,
  obj => obj && obj.importo
);

export const dataForHome = createSelector(
  getNameUtentePagatoPiuVolte,
  getValueUtentePagatoPiuVolte,
  getNameGruppoPartecipatoPiuVolte,
  getValueGruppoPartecipatoPiuVolte,
  getNameUtenteBigPay,
  getValueUtenteBigPay,
  (
    nameUtenteMore,
    valueUtenteMore,
    nameGruppoMore,
    valueGruppoMore,
    nameUtenteBigPay,
    valueUtenteBigPay
  ) => ({
    nameUtenteMore,
    valueUtenteMore,
    nameGruppoMore,
    valueGruppoMore,
    nameUtenteBigPay,
    valueUtenteBigPay
  })
);
