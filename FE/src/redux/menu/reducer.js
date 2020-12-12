import {
  MENU_INIT,
  MENU_ICON_CLICKED,
  MENU_ACTIVE_ICON_CHANGED,
  MENU_SECOND_LEVEL_SIDEBAR_OPENED,
  MENU_SECOND_LEVEL_SIDEBAR_CLOSED,
  MENU_SECOND_LEVEL_SIDEBAR_TOGGLED
} from "./actionTypes";

const initialState = {
  menuItems: [],
  clickedIcon: null,
  activeIcon: null,
  secondLevelSidebarOpen:false
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_INIT: {
      const { menuItems, initialActiveIcon } = action.payload;
      const activeIcon = initialActiveIcon || (menuItems && menuItems[0]) || null;
      return { ...state, menuItems, activeIcon };
    }
    case MENU_ICON_CLICKED: {
        return { ...state, clickedIcon:action.payload.clickedIcon };
    }
    case MENU_ACTIVE_ICON_CHANGED: {
        return { ...state, activeIcon:action.payload.activeIcon };
    }
    case MENU_SECOND_LEVEL_SIDEBAR_OPENED: {
        return { ...state, secondLevelSidebarOpen:true };
    }
    case MENU_SECOND_LEVEL_SIDEBAR_CLOSED: {
        return { ...state, secondLevelSidebarOpen:false };
    }
    case MENU_SECOND_LEVEL_SIDEBAR_TOGGLED: {
        return { ...state, secondLevelSidebarOpen:!state.secondLevelSidebarOpen };
    }
    default: {
      return state;
    }
  }
};
