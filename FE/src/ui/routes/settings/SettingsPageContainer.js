import { connect } from "react-redux";
import { SettingsPage } from "./SettingsPage";

import {
  handleSubmit,
  selectHostname,
  changeCustomHostname
} from "../../../redux/settings/actions";
import {
  getHostname,
  getSelectedHostname,
  getCustomHostname,
  isSelectHostnameFormDisabled,
  isCustomHostnameSelected
} from "../../../redux/settings/selectors";

const mapStateToProps = state => ({
  hostname: getHostname(state),
  selectedHostname: getSelectedHostname(state),
  customHostname: getCustomHostname(state),
  isFormDisabled: isSelectHostnameFormDisabled(state),
  isCustomSelected:isCustomHostnameSelected(state)
});

const mapDispatchToProps = { handleSubmit, selectHostname, changeCustomHostname };

export const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
