import {
  showSuccessAlert,
  showErrorAlert,
  showInfoAlert
} from "../feedback-manager/actions";

export const mockSuccess = input => dispatch => {
  switch (input) {
    case 1: {
      dispatch(showSuccessAlert());
      break;
    }
    case 2: {
      dispatch(showErrorAlert());
      break;
    }
    default: {
      dispatch(showInfoAlert());
      break;
    }
  }
};
