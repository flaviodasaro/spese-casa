import { useEffect } from "react";
import { GenericModal } from "../../../../common/components/generic-modal/GenericModal";
//import "./MinnicuModal.scss";

export const MinnicuModal = ({ shouldShowMinnicuModal }) => {
  /* useEffect(() => {
    setTimeout(() => {
      console.log(shouldShowMinnicuModal);
    }, 2000)
  }, []); */
  if (shouldShowMinnicuModal) {
    return (
      <GenericModal /* externalOpen isOpen={shouldShowMinnicuModal} */>
        <div style={{ width: "500px", height: "500px" }}>
          <img src="MinnicuImg.jpg" width="500" height="500" />
        </div>
      </GenericModal>
    );
  } else {
    return null;
  }
};
