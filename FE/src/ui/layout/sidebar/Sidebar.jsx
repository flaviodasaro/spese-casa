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
  MANAGE_USER_KEY
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
    tooltipMessage: "Gruppi e Utenti",
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
        label: "Gestisci utenti"
      }
    ]
  },
  {
    key: SETTINGS_KEY,
    iconName: faCog,
    tooltipMessage: "Impostazioni",
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
        tootlipMessage={iconSetting.tooltipMessage}
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
