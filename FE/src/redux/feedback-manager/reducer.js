import {
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_INFO
} from "../common/constants";

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

const ALERT_DEFAULT_SHOW_TIME = 2500;
const FEEDBACK_DEFAULT_TITLE = "FEEDBACK.DEFAULT_TITLE";
const FEEDBACK_DEFAULT_SUBTITLE = "FEEDBACK.DEFAULT_SUBTITLE";

const initialState = {
  showAlert: false,
  alertType: ALERT_TYPE_ERROR,
  showTime: ALERT_DEFAULT_SHOW_TIME,
  isFeedbackModalOpen: false,
  feedbackModalTitleKey: FEEDBACK_DEFAULT_TITLE,
  feedbackModalSubtitleKey: FEEDBACK_DEFAULT_SUBTITLE,
  isFeedbackModalSuccess: true,
};

export const feedbackManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SHOWN: {
      return { ...state, showAlert: true };
    }
    case ALERT_HIDDEN: {
      return { ...state, showAlert: false };
    }
    case ALERT_TYPE_SET: {
      return { ...state, alertType: action.payload.alertType };
    }
    case ALERT_SHOW_TIME_CHANGED: {
      return { ...state, showTime: action.payload.showTime };
    }
    case ALERT_STATE_RESET: {
      return {
        ...state,
        showAlert: false,
        alertType: ALERT_TYPE_ERROR,
        showTime: ALERT_DEFAULT_SHOW_TIME
      };
    }
    case FEEDBACK_MODAL_OPENED: {
      return {...state, isFeedbackModalOpen:true };
    }
    case FEEDBACK_MODAL_CLOSED: {
      return {...state, isFeedbackModalOpen:false };
    }
    case FEEDBACK_MODAL_TITLEKEY_SET: {
      return { ...state, feedbackModalTitleKey: action.payload.feedbackModalTitleKey };
    }
    case FEEDBACK_MODAL_SUBTITLEKEY_SET: {
      return { ...state, feedbackModalSubtitleKey: action.payload.feedbackModalSubtitleKey };
    }
    case FEEDBACK_MODAL_SUCCESS_SET: {
      return  { ...state, isFeedbackModalSuccess: action.payload.isFeedbackModalSuccess };
    }
    case FEEDBACK_MODAL_STATE_RESET: {
      return {
          ...state,
          isFeedbackModalOpen: false,
          isFeedbackModalSuccess: true,
          feedbackModalTitleKey: FEEDBACK_DEFAULT_TITLE,
          feedbackModalSubtitleKey: FEEDBACK_DEFAULT_SUBTITLE
      }
    }
    default: {
      return state;
    }
  }
};
