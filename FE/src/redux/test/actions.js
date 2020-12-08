export const TEST = "test";

export const testDispatch = (input) => (dispatch, getState, _) => {
  dispatch({
    type: TEST,
    payload: input,
  });
};
