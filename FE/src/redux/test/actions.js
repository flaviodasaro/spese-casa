import { TEST } from "./actionTypes";

export const testDispatch = (input) => (dispatch, getState) => {
  dispatch({
    type: TEST,
    payload: input,
  });
};
