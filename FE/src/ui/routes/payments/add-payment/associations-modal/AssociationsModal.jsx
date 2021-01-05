import { GenericModal } from "../../../../common/components/generic-modal/GenericModal";
import { AssociationsTable } from "../../../users/manage-users/associations-table/AssociationsTable";
import { withNamespaces } from "react-i18next";
import "./AssociationsModal.scss";

export const AssociationsModal = withNamespaces()(
  ({ associationList, isOpen, onClose, t }) => {
    return (
      <GenericModal externalOpen isOpen={isOpen} onClose={onClose}>
        <h1 className="heading">{t("PAYMENTS.ASSOCIATIONS_MODAL_TITLE")}</h1>
        <div className="association-table-wrapper">
          <AssociationsTable rows={associationList} />
        </div>
      </GenericModal>
    );
  }
);
