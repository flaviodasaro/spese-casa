import axios from "axios";
import { LOADER_KEYS } from "../loader/loaderKeys";
import { increaseLoader, decreaseLoader } from "../loader/actions";
import {
  showSuccessAlert,
  showErrorAlert,
  showFeedbackModalWithProps
} from "../feedback-manager/actions";

import { getHostName } from "../settings/selectors";

export const API_VERBS = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete"
};

const COMMON_READ_SETTINGS = {
  handleErrorWithAlert: true,
  showSuccessAlert: false
};

const COMMON_WRITE_SETTINGS = {
  handleErrorWithAlert: true,
  showSuccessAlert: true
};

const mapVerbToCommonSettings = {
  [API_VERBS.GET]: COMMON_READ_SETTINGS,
  [API_VERBS.POST]: COMMON_WRITE_SETTINGS,
  [API_VERBS.PUT]: COMMON_WRITE_SETTINGS,
  [API_VERBS.DELETE]: COMMON_WRITE_SETTINGS
};

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

const commonHandler = ({
  dispatch,
  promiseGetter,
  onSuccess,
  showSuccessAlert,
  onFailure,
  handleErrorWithAlert,
  feedbackModalErrorProps,
  loader
}) => {
  return handleApiresult(
    promiseGetter(),
    commonSuccess(dispatch, onSuccess, showSuccessAlert),
    commonFailure(
      dispatch,
      onFailure,
      handleErrorWithAlert,
      feedbackModalErrorProps
    ),
    commonFinally(dispatch, loader)
  );
};

const commonSuccess = (dispatch, onSuccess, showAlert) => response => {
  onSuccess && onSuccess(response);
  showAlert && dispatch(showSuccessAlert());
};

const commonFailure = (
  dispatch,
  onFailure,
  handleErrorWithAlert,
  feedbackModalErrorProps
) => response => {
  onFailure && onFailure(response);
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
};

export const genericApiCall = (verb, apiParams, settings = {}) => (
  dispatch,
  getState
) => {
  let settingsToUse = mapVerbToCommonSettings[verb];
  if (settings) {
    settingsToUse = { ...settingsToUse, ...settings };
  }
  const {
    loaderKey,
    handleErrorWithAlert,
    showSuccessAlert,
    feedbackModalErrorProps
  } = settingsToUse;

  const { endpoint, queryParams, body, onSuccess, onFailure } = apiParams;

  const loader = loaderKey || LOADER_KEYS.GLOBAL;
  const url = `${getHostName(getState())}/${endpoint}`;

  dispatch(increaseLoader(loader));

  switch (verb) {
    case API_VERBS.GET: {
      return commonHandler({
        dispatch,
        promiseGetter: () => axios.get(url, { params: queryParams || {} }),
        onSuccess,
        showSuccessAlert,
        onFailure,
        handleErrorWithAlert,
        feedbackModalErrorProps,
        loader
      });
    }
    case API_VERBS.POST: {
      return commonHandler({
        dispatch,
        promiseGetter: () => axios.post(url, { ...body }),
        onSuccess,
        showSuccessAlert,
        onFailure,
        handleErrorWithAlert,
        feedbackModalErrorProps,
        loader
      });
    }
    case API_VERBS.PUT: {
      return commonHandler({
        dispatch,
        promiseGetter: () => axios.put(url, { ...body }),
        onSuccess,
        showSuccessAlert,
        onFailure,
        handleErrorWithAlert,
        feedbackModalErrorProps,
        loader
      });
    }
    case API_VERBS.DELETE:{
      return commonHandler({
        dispatch,
        promiseGetter: () => axios.delete(url, { params: queryParams || {} }),
        onSuccess,
        showSuccessAlert,
        onFailure,
        handleErrorWithAlert,
        feedbackModalErrorProps,
        loader
      });
    }
    default: {
      break;
    }
  }
};
