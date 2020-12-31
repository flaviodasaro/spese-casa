import { LOADER_INCREASED, LOADER_DECREASED } from "./actionTypes";

export const increaseLoader = key => ({
  type: LOADER_INCREASED,
  payload: { key }
});

export const decreaseLoader = key => ({
  type: LOADER_DECREASED,
  payload: { key }
});
