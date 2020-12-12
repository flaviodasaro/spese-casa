import { connect } from "react-redux";
import { SecondLevelSidebar } from "./SecondLevelSidebar";

import {
  openSecondLevelSidebar,
  closeSecondLevelSidebar,
  toggleSecondLevelSidebar,
  navigateAndCloseSidebar
} from "../../../redux/menu/actions";

import { getSecondLevelSidebarOpen, getClickedIcon } from "../../../redux/menu/selectors";

const mapStateToProps = state => ({
    secondLevelSidebarOpen:getSecondLevelSidebarOpen(state),
    clickedIcon:getClickedIcon(state)
});

const mapDispatchToProps = {
  openSecondLevelSidebar,
  closeSecondLevelSidebar,
  toggleSecondLevelSidebar,
  navigateAndCloseSidebar
};

export const SecondLevelSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondLevelSidebar);
