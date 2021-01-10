import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withHover } from "../../hocs/withHover";
import { withNamespaces } from "react-i18next";

export const IconWithTooltip = withNamespaces()(
  ({
    tootlipMessage,
    t,
    tooltipMessageI18nKey,
    fontAwesomeIconProps,
    otherTooltipDivProps,
    otherTooltipSpanProps
  }) => {
    const message = tooltipMessageI18nKey
      ? t(tooltipMessageI18nKey)
      : tootlipMessage;
    const FinalComponent = withHover(message, otherTooltipDivProps, otherTooltipSpanProps)(FontAwesomeIcon);
    return (
      <>{FinalComponent && <FinalComponent {...fontAwesomeIconProps} />}</>
    );
  }
);

IconWithTooltip.defaultProps = {
  tootlipMessage: "",
  fontAwesomeIconProps: {}
};
