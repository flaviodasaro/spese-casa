import axios from "axios";
import { LOADER_KEYS } from "../loader/loaderKeys";
import { increaseLoader, decreaseLoader } from "../loader/actions";
import {
  showSuccessAlert,
  showErrorAlert,
  showFeedbackModalWithProps
} from "../feedback-manager/actions";

const handleApiresult = (promise, onSuccess, onFailure, onFinally) =>
  promise
    .then(onSuccess)
    .catch(onFailure)
    .finally(res => {
      if (onFinally) {
        return onFinally(res);
      }
      return res;
    });

export const performGet = (
  url,
  queryParams,
  onSuccess,
  onFailure,
  onFinally
) => {
  return handleApiresult(
    axios.get(url, { params: queryParams || {} }),
    onSuccess,
    onFailure,
    onFinally
  );
};

export const genericApiCall = (verb, apiParams, settings) => dispatch => {
  const { loaderKey, handleErrorWithAlert, feedbackModalErrorProps } = settings;
  const loader = loaderKey || LOADER_KEYS.GLOBAL;
  dispatch(increaseLoader(loader));
  switch (verb) {
    case "get": {
      const { url, queryParams, onSuccess, onFailure } = apiParams;
      performGet(
        url,
        queryParams,
        commonSuccess(dispatch, onSuccess),
        commonFailure(
          dispatch,
          onFailure,
          handleErrorWithAlert,
          feedbackModalErrorProps
        ),
        commonFinally(dispatch, loader)
      );
    }
  }
};

const commonSuccess = (dispatch, onSuccess) => response => {
  onSuccess(response);
  dispatch(showSuccessAlert());
};

const commonFailure = (
  dispatch,
  onFailure,
  handleErrorWithAlert,
  feedbackModalErrorProps
) => response => {
  onFailure(response);
  if (handleErrorWithAlert) {
    dispatch(showErrorAlert());
  } else {
    const {
      feedbackModalTitleKey,
      feedbackModalSubtitleKey
    } = feedbackModalErrorProps;
    dispatch(
      showFeedbackModalWithProps(
        feedbackModalTitleKey,
        feedbackModalSubtitleKey,
        false
      )
    );
  }
};

const commonFinally = (dispatch, loaderKey) => response => {
  dispatch(decreaseLoader(loaderKey));
  return response;
}