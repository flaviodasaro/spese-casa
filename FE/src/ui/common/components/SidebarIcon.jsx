import { IconWithTooltip } from "./icon-with-tooltip/IconWithTooltip";

export const SidebarIcon = ({ tootlipMessage, iconName }) => (
  <IconWithTooltip
    tootlipMessage={tootlipMessage}
    fontAwesomeIconProps={{ icon: iconName, color: "white", size: "3x" }}
  />
);
