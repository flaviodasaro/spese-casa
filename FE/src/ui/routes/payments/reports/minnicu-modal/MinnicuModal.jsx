import { GenericModal } from "../../../../common/components/generic-modal/GenericModal";
import "./MinnicuModal.scss";

export const MinnicuModal = ({ shouldShowMinnicuModal }) => {
  
  if (shouldShowMinnicuModal) {
    return (
      <GenericModal>
        <div className="minnicu-modal">
          <img src="MinnicuImg.jpg" width="500" height="500" />
        </div>
      </GenericModal>
    );
  } else {
    return null;
  }
};
