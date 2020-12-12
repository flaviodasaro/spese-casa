import { Sidebar } from "./Sidebar";
import { connect } from "react-redux";
import {
  initMenu,
  clickMenuIcon,
  changeActiveIcon,
  openSecondLevelSidebar,
  closeSecondLevelSidebar,
  toggleSecondLevelSidebar
} from "../../../redux/menu/actions";
import { push } from "connected-react-router";
import {
  getMenuItems,
  getClickedIcon,
  getActiveIcon,
  getSecondLevelSidebarOpen
} from "../../../redux/menu/selectors";

const mapStateToProps = state => ({
  menuItems: getMenuItems(state),
  clickedIcon: getClickedIcon(state),
  activeIcon: getActiveIcon(state),
  secondLevelSidebarOpen: getSecondLevelSidebarOpen(state)
});

const mapDispatchToProps = {
  initMenu,
  clickMenuIcon,
  changeActiveIcon,
  openSecondLevelSidebar,
  closeSecondLevelSidebar,
  toggleSecondLevelSidebar,
  push
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
