import { IconWithTooltip } from "./icon-with-tooltip/IconWithTooltip";

export const SidebarIcon = ({ tooltipMessageI18nKey, iconName }) => (
  <IconWithTooltip
    tooltipMessageI18nKey={tooltipMessageI18nKey}
    fontAwesomeIconProps={{ icon: iconName, color: "white", size: "3x" }}
  />
);
