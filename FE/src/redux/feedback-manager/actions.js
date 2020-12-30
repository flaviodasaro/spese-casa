import {
  ALERT_SHOWN,
  ALERT_HIDDEN,
  ALERT_TYPE_SET,
  ALERT_SHOW_TIME_CHANGED,
  ALERT_STATE_RESET,
  FEEDBACK_MODAL_OPENED,
  FEEDBACK_MODAL_CLOSED,
  FEEDBACK_MODAL_TITLEKEY_SET,
  FEEDBACK_MODAL_SUBTITLEKEY_SET,
  FEEDBACK_MODAL_SUCCESS_SET,
  FEEDBACK_MODAL_STATE_RESET
} from "./actionTypes";

import {
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_INFO
} from "../common/constants";

//******************** ALERT *********************/
export const showAlert = () => ({ type: ALERT_SHOWN });

export const hideAlert = () => ({ type: ALERT_HIDDEN });

export const setAlertType = alertType => ({
  type: ALERT_TYPE_SET,
  payload: { alertType }
});
export const changeAlertShowTime = showTime => ({
  type: ALERT_SHOW_TIME_CHANGED,
  payload: showTime
});

export const resetAlertState = () => ({ type: ALERT_STATE_RESET });

export const showErrorAlert = () => dispatch => {
  dispatch(setAlertType(ALERT_TYPE_ERROR));
  dispatch(showAlert());
};

export const showSuccessAlert = () => dispatch => {
  dispatch(setAlertType(ALERT_TYPE_SUCCESS));
  dispatch(showAlert());
};

export const showInfoAlert = () => dispatch => {
  dispatch(setAlertType(ALERT_TYPE_INFO));
  dispatch(showAlert());
};

//******************** FEEDBACK MODAL *********************/

export const showFeedbackModal = () => ({ type: FEEDBACK_MODAL_OPENED });
export const hideFeedbackModal = () => ({ type: FEEDBACK_MODAL_CLOSED });

export const setFeedbackModalTitle = feedbackModalTitleKey => ({
  type: FEEDBACK_MODAL_TITLEKEY_SET,
  payload: { feedbackModalTitleKey }
});
export const setFeedbackModalSubtitle = feedbackModalSubtitleKey => ({
  type: FEEDBACK_MODAL_SUBTITLEKEY_SET,
  payload: { feedbackModalSubtitleKey }
});

export const setFeedbackModalSuccess = isFeedbackModalSuccess => ({
  type: FEEDBACK_MODAL_SUCCESS_SET,
  payload: { isFeedbackModalSuccess }
});
export const resetFeedbackModalState = () => ({
  type: FEEDBACK_MODAL_STATE_RESET
});

export const showFeedbackModalWithProps = (
  feedbackModalTitleKey,
  feedbackModalSubtitleKey,
  isFeedbackModalSuccess
) => dispatch => {
  dispatch(setFeedbackModalTitle(feedbackModalTitleKey));
  dispatch(setFeedbackModalSubtitle(feedbackModalSubtitleKey));
  dispatch(setFeedbackModalSuccess(isFeedbackModalSuccess));
  dispatch(showFeedbackModal());
};
