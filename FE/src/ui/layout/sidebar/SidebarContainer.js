import { Sidebar } from "./Sidebar";
import { connect } from "react-redux";
import {
  initMenu,
  openSidebarWithChildren,
  navigateAndCloseSidebar,
  closeSidebarAndResetIconClicked
} from "../../../redux/menu/actions";

import {
  getClickedIcon,
  getActiveIcon,
} from "../../../redux/menu/selectors";

const mapStateToProps = state => ({
  clickedIcon: getClickedIcon(state),
  activeIcon: getActiveIcon(state)
});

const mapDispatchToProps = {
  initMenu,
  navigateAndCloseSidebar,
  openSidebarWithChildren,
  closeSidebarAndResetIconClicked
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
