import { connect } from "react-redux";
import { SettingsPage } from "./SettingsPage";

import { toggleMockHostName, doTestGet, testGetUserById } from "../../../redux/settings/actions";
import {
  getIsMockHostName,
  getTestResponse
} from "../../../redux/settings/selectors";

const mapStateToProps = state => ({
  isMockHostName: getIsMockHostName(state),
  testResponse: getTestResponse(state)
});

const mapDispatchToProps = { toggleMockHostName, doTestGet, testGetUserById };

export const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
