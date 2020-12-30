import { connect } from "react-redux";
import { FeedbackManager } from "./FeedbackManager";
import {
  getShowAlert,
  getAlertType,
  getShowTime,
  getIsFeedbackModalOpen,
  getIsFeedbackModalSuccess,
  getFeedbackModalTitleKey,
  getFeedbackModalSubtitleKey
} from "../../../redux/feedback-manager/selectors";

import { hideAlert } from "../../../redux/feedback-manager/actions";

const mapStateToProps = state => ({
  showAlert: getShowAlert(state),
  alertType: getAlertType(state),
  showTime: getShowTime(state),
  isFeedbackModalOpen: getIsFeedbackModalOpen(state),
  isFeedbackModalSuccess: getIsFeedbackModalSuccess(state),
  feedbackModalTitleKey: getFeedbackModalTitleKey(state),
  feedbackModalSubtitleKey: getFeedbackModalSubtitleKey(state)
});

const mapDispatchToProps = { hideAlertCallback:hideAlert };

export const FeedbackManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackManager);
