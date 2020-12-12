import { createSelector } from "reselect";

export const getMenuSlice = state => state.menuReducer;

export const getMenuItems = createSelector(
  getMenuSlice,
  state => state.menuItems
);
export const getClickedIcon = createSelector(
  getMenuSlice,
  state => state.clickedIcon
);
export const getActiveIcon = createSelector(
  getMenuSlice,
  state => state.activeIcon
);
export const getSecondLevelSidebarOpen = createSelector(
  getMenuSlice,
  state => state.secondLevelSidebarOpen
);

export const getIconObjectByKey = key => createSelector(
  getMenuItems,
  items => items && items.find(el => el.key === key)
);
