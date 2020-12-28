import { GenericModal } from "../generic-modal/GenericModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import "./FeedbackModal.scss";

export const FeedbackModal = ({
  isSuccess,
  title,
  subtitle,
  isOpen,
  onClose
}) => {
  let icon = faCheck;
  let iconColor = "green";
  if (!isSuccess) {
    icon = faExclamationTriangle;
    iconColor = "red";
  }
  return (
    <GenericModal externalOpen isOpen={isOpen} onClose={onClose}>
      <div className="body-wrapper">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div>
          <FontAwesomeIcon icon={icon} color={iconColor} size={"10x"} />
        </div>
      </div>
    </GenericModal>
  );
};
