import {
  ASSOCIATIONS_MODAL_OPENED,
  ASSOCIATIONS_MODAL_CLOSED
} from "./actionTypes";
import { fetchAssociationByGroup } from "../users/actions";

const openAssociationModal = () => ({ type: ASSOCIATIONS_MODAL_OPENED });

export const onOpenAssociationListModal = idGruppo => dispatch => {
  dispatch(fetchAssociationByGroup(idGruppo)).then(res =>
    dispatch(openAssociationModal())
  );
};

export const closeAssociationsModal = () => ({
  type: ASSOCIATIONS_MODAL_CLOSED
});
