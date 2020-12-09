import "./Sidebar.scss";
import {
  faHome,
  faCog,
  faUser,
  faEuroSign
} from "@fortawesome/free-solid-svg-icons";
import { SidebarIcon } from "../../common/components/SidebarIcon";

const iconSettings = [
  {
    iconName: faHome,
    tooltipMessage: "HOME",
    openSecondLevel:false
  },
  {
    iconName: faEuroSign,
    tooltipMessage: "Pagamenti",
    openSecondLevel:true
  },
  {
    iconName: faUser,
    tooltipMessage: "Gruppi e Utenti",
    openSecondLevel:true
  },
  {
    iconName: faCog,
    tooltipMessage: "Impostazioni",
    openSecondLevel:true
  }
];

const SidebarIconWrapper = ({ iconSetting }) => {
  return (
    <div className="sidebar-icon-wrapper">
      <SidebarIcon
        tootlipMessage={iconSetting.tooltipMessage}
        iconName={iconSetting.iconName}
      />
      <div className="divider"></div>
    </div>
  );
};

export const Sidebar = props => {
  return (
    <div className="sidebar" onClick={props.onClickSidebar}>
      {iconSettings.map((el, index) => (
        <SidebarIconWrapper key={`sidebarIcon${index}`} iconSetting={el} />
      ))}
    </div>
  );
};
