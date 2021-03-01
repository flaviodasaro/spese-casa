import { useEffect } from "react";
import "./Sidebar.scss";
import {
  faHome,
  faCog,
  faFunnelDollar,
  faUser,
  faEuroSign,
  faStickyNote
} from "@fortawesome/free-solid-svg-icons";
import { SidebarIcon } from "../../common/components/SidebarIcon";
import {
  SETTINGS_ROUTE,
  HOME_ROUTE,
  HOME_KEY,
  PAYMENTS_KEY,
  USERS_KEY,
  SETTINGS_KEY,
  ADD_USER_ROUTE,
  CREATE_GROUP_ROUTE,
  MANAGE_USER_ROUTE,
  ADD_PAYMENT_ROUTE,
  REPORTS_ROUTE,
  ADD_PAYMENT_KEY,
  REPORTS_KEY,
  ADD_USER_KEY,
  CREATE_GROUP_KEY,
  MANAGE_USER_KEY,
  SPENDING_CATEGORIES_KEY,
  SPENDING_CATEGORIES_ROUTE,
  NOTES_KEY,
  NOTES_ROUTE
} from "../../common/constants";

const iconSettings = [
  {
    key: HOME_KEY,
    iconName: faHome,
    tooltipMessageI18nKey: "MENU.HOME",
    openSecondLevel: false,
    route: HOME_ROUTE
  },
  {
    key: PAYMENTS_KEY,
    iconName: faEuroSign,
    tooltipMessageI18nKey: "MENU.PAYMENTS",
    openSecondLevel: true,
    children: [
      {
        key: ADD_PAYMENT_KEY,
        route: ADD_PAYMENT_ROUTE,
        label: "Aggiungi pagamento"
      },
      {
        key: REPORTS_KEY,
        route: REPORTS_ROUTE,
        label: "Reports"
      }
    ]
  },
  {
    key: USERS_KEY,
    iconName: faUser,
    tooltipMessageI18nKey: "MENU.USERS",
    openSecondLevel: true,
    children: [
      {
        key: ADD_USER_KEY,
        route: ADD_USER_ROUTE,
        label: "Aggiungi utente"
      },
      {
        key: CREATE_GROUP_KEY,
        route: CREATE_GROUP_ROUTE,
        label: "Crea gruppo"
      },
      {
        key: MANAGE_USER_KEY,
        route: MANAGE_USER_ROUTE,
        label: "Gestisci associazioni"
      }
    ]
  },
  {
    key: SPENDING_CATEGORIES_KEY,
    iconName: faFunnelDollar,
    tooltipMessageI18nKey: "MENU.SPENDING_CATEGORIES",
    openSecondLevel: false,
    route: SPENDING_CATEGORIES_ROUTE
  },
  {
    key: NOTES_KEY,
    iconName: faStickyNote,
    tooltipMessageI18nKey: "MENU.NOTES",
    openSecondLevel: false,
    route: NOTES_ROUTE
  },
  {
    key: SETTINGS_KEY,
    iconName: faCog,
    tooltipMessageI18nKey: "MENU.SETTINGS",
    openSecondLevel: false,
    route: SETTINGS_ROUTE
  }
];

const SidebarIconWrapper = ({
  iconSetting,
  activeIcon,
  clickedIcon,
  openSidebarWithChildren,
  navigateAndCloseSidebar,
  closeSidebarAndResetIconClicked
}) => {
  const { openSecondLevel, route, key } = iconSetting;

  const selectedClassName =
    activeIcon && activeIcon.key === key ? " selected" : "";
  const clickedClassName =
    clickedIcon && clickedIcon.key === key ? " clicked" : "";

  function onClick(event) {
    if (openSecondLevel) {
      if (clickedIcon && clickedIcon.key === key) {
        closeSidebarAndResetIconClicked();
      } else {
        openSidebarWithChildren(iconSetting);
      }
    }
    if (route) {
      navigateAndCloseSidebar(route);
    }
  }
  return (
    <div
      className={`sidebar-icon-wrapper${selectedClassName}${clickedClassName}`}
      onClick={onClick}
    >
      <SidebarIcon
        tooltipMessageI18nKey={iconSetting.tooltipMessageI18nKey}
        iconName={iconSetting.iconName}
      />
      <div className="divider"></div>
    </div>
  );
};

export const Sidebar = ({
  activeIcon,
  initMenu,
  clickedIcon,
  openSidebarWithChildren,
  navigateAndCloseSidebar,
  closeSidebarAndResetIconClicked
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
          clickedIcon={clickedIcon}
          openSidebarWithChildren={openSidebarWithChildren}
          navigateAndCloseSidebar={navigateAndCloseSidebar}
          closeSidebarAndResetIconClicked={closeSidebarAndResetIconClicked}
        />
      ))}
    </div>
  );
};
