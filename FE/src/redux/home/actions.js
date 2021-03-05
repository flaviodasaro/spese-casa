import { API_VERBS, genericApiCall } from "../api/utils";
import {
  HOME_INIT_FETCHED,
  HOME_RESET,
  HOME_FORBIDDEN_DETECTED
} from "./actionTypes";

const PAGAMENTO_CONTROLLER_SUB_URL = "pagamento";
const HOME_INIT_URL = `${PAGAMENTO_CONTROLLER_SUB_URL}/home-init`;

const fetchHomeInit = initResponse => ({
  type: HOME_INIT_FETCHED,
  payload: { initResponse }
});

const resetHomeState = () => ({ type: HOME_RESET });
const detectForbidden = () => ({ type: HOME_FORBIDDEN_DETECTED });

export const init = () => dispatch => {
  dispatch(resetHomeState());
  return dispatch(
    genericApiCall(API_VERBS.GET, {
      endpoint: HOME_INIT_URL,
      onSuccess: resp => dispatch(fetchHomeInit(resp.data)),
      onFailure: err => {
        const statusCode = err.response && err.response.status;
        if (statusCode === 403) {
          //probably issue caused by cors-anywhere-heroku
          dispatch(detectForbidden());
        }
      }
    })
  );
};
