import { API_VERBS, genericApiCall } from "../api/utils";
import { HOME_INIT_FETCHED } from "./actionTypes";

const PAGAMENTO_CONTROLLER_SUB_URL = "pagamento";
const HOME_INIT_URL = `${PAGAMENTO_CONTROLLER_SUB_URL}/home-init`;

const fetchHomeInit = initResponse => ({
  type: HOME_INIT_FETCHED,
  payload: { initResponse }
});

export const init = () => dispatch =>
  dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: HOME_INIT_URL,
      onSuccess: resp => dispatch(fetchHomeInit(resp.data))
    })
  );
