import { createSelector } from "reselect";

export const feedbackManagerSlice = state => state.feedbackManagerReducer;

export const getShowAlert = createSelector(
  feedbackManagerSlice,
  state => state.showAlert
);

export const getAlertType = createSelector(
  feedbackManagerSlice,
  state => state.alertType
);

export const getShowTime = createSelector(
  feedbackManagerSlice,
  state => state.showTime
);

export const getIsFeedbackModalOpen = createSelector(
  feedbackManagerSlice,
  state => state.isFeedbackModalOpen
);

export const getIsFeedbackModalSuccess = createSelector(
  feedbackManagerSlice,
  state => state.isFeedbackModalSuccess
);

export const getFeedbackModalTitleKey = createSelector(
  feedbackManagerSlice,
  state => state.feedbackModalTitleKey
);

export const getFeedbackModalSubtitleKey = createSelector(
  feedbackManagerSlice,
  state => state.feedbackModalSubtitleKey
);
