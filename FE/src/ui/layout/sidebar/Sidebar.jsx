import { useEffect } from "react";
import "./Sidebar.scss";
import {
  faHome,
  faCog,
  faUser,
  faEuroSign
} from "@fortawesome/free-solid-svg-icons";
import { SidebarIcon } from "../../common/components/SidebarIcon";
import {
  SETTINGS_ROUTE,
  HOME_ROUTE,
  HOME_KEY,
  PAYMENTS_KEY,
  USERS_KEY,
  SETTINGS_KEY
} from "../../common/constants";

const iconSettings = [
  {
    key: HOME_KEY,
    iconName: faHome,
    tooltipMessage: "HOME",
    openSecondLevel: false,
    route: HOME_ROUTE
  },
  {
    key: PAYMENTS_KEY,
    iconName: faEuroSign,
    tooltipMessage: "Pagamenti",
    openSecondLevel: true
  },
  {
    key: USERS_KEY,
    iconName: faUser,
    tooltipMessage: "Gruppi e Utenti",
    openSecondLevel: true
  },
  {
    key: SETTINGS_KEY,
    iconName: faCog,
    tooltipMessage: "Impostazioni",
    openSecondLevel: true,
    route: SETTINGS_ROUTE
  }
];

const SidebarIconWrapper = ({
  iconSetting,
  activeIcon,
  openSecondLevelSidebar,
  push
}) => {
  const { openSecondLevel, route, key } = iconSetting;
  const selectedClassName =
    activeIcon && activeIcon.key === key ? " selected" : "";
  function onClick(event) {
    if (openSecondLevel) {
      openSecondLevelSidebar();
    }
    if (route) {
      push(route);
    }
  }
  return (
    <div
      className={`sidebar-icon-wrapper${selectedClassName}`}
      onClick={onClick}
    >
      <SidebarIcon
        tootlipMessage={iconSetting.tooltipMessage}
        iconName={iconSetting.iconName}
      />
      <div className="divider"></div>
    </div>
  );
};

export const Sidebar = ({
  menuItems,
  clickedIcon,
  activeIcon,
  secondLevelSidebarOpen,
  initMenu,
  clickMenuIcon,
  changeActiveIcon,
  openSecondLevelSidebar,
  closeSecondLevelSidebar,
  toggleSecondLevelSidebar,
  push
}) => {
  useEffect(() => {
    initMenu(iconSettings);
  }, []);

  return (
    <div className="sidebar">
      {iconSettings.map((el, index) => (
        <SidebarIconWrapper
          key={`sidebarIcon${index}`}
          iconSetting={el}
          activeIcon={activeIcon}
          openSecondLevelSidebar={openSecondLevelSidebar}
          push={push}
        />
      ))}
    </div>
  );
};
