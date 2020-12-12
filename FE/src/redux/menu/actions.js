import {
  MENU_INIT,
  MENU_ICON_CLICKED,
  MENU_ACTIVE_ICON_CHANGED,
  MENU_SECOND_LEVEL_SIDEBAR_OPENED,
  MENU_SECOND_LEVEL_SIDEBAR_CLOSED,
  MENU_SECOND_LEVEL_SIDEBAR_TOGGLED
} from "./actionTypes";
import { getSecondLevelSidebarOpen } from "./selectors";
import { push } from "connected-react-router";

export const initMenu = (menuItems, initialActiveIcon) => ({
  type: MENU_INIT,
  payload: {
    menuItems,
    initialActiveIcon
  }
});

export const clickMenuIcon = clickedIcon => ({
  type: MENU_ICON_CLICKED,
  payload: {
    clickedIcon
  }
});

export const changeActiveIcon = activeIcon => ({
  type: MENU_ACTIVE_ICON_CHANGED,
  payload: {
    activeIcon
  }
});

export const openSecondLevelSidebar = () => ({
  type: MENU_SECOND_LEVEL_SIDEBAR_OPENED
});
export const closeSecondLevelSidebar = () => ({
  type: MENU_SECOND_LEVEL_SIDEBAR_CLOSED
});
export const toggleSecondLevelSidebar = () => ({
  type: MENU_SECOND_LEVEL_SIDEBAR_TOGGLED
});

export const closeSidebarAndResetIconClicked = () => (dispatch, getState) => {
  if(getSecondLevelSidebarOpen(getState())){
    dispatch(closeSecondLevelSidebar());
    dispatch(clickMenuIcon(null));
  }
};

export const navigateAndCloseSidebar = (
  route,
  milliseconds = 0
) => dispatch => {
  dispatch(push(route));
  setTimeout(() => {
    dispatch(closeSidebarAndResetIconClicked());
  }, milliseconds);
};

export const openSidebarWithChildren = menuIcon => dispatch => {
  dispatch(clickMenuIcon(menuIcon));
  dispatch(openSecondLevelSidebar());
};
