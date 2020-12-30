import { Alert } from "../alert/Alert";
import { FeedbackModal } from "../feedback-modal/FeedbackModal";
import { withNamespaces } from "react-i18next";

export const FeedbackManager = withNamespaces()(
  ({
    showAlert,
    hideAlertCallback,
    alertType,
    showTime,
    isFeedbackModalSuccess,
    feedbackModalTitleKey,
    feedbackModalSubtitleKey,
    isFeedbackModalOpen,
    onCloseFeedbackModal,
    t
  }) => {
    return (
      <>
        <Alert
          show={showAlert}
          hideCallback={hideAlertCallback}
          type={alertType}
          showTime={showTime}
        />
        <FeedbackModal
          isSuccess={isFeedbackModalSuccess}
          title={t(feedbackModalTitleKey)}
          subtitle={t(feedbackModalSubtitleKey)}
          isOpen={isFeedbackModalOpen}
          onClose={onCloseFeedbackModal}
        />
      </>
    );
  }
);
