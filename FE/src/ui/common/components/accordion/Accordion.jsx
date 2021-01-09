import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNamespaces } from "react-i18next";
import "./Accordion.scss";
import {
  faChevronDown,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "@material-ui/core";
import { useState } from "react";

export const Accordion = withNamespaces()(props => {
  const {
    onClick,
    textKey,
    t,
    iconIfClosed,
    iconIfOpen,
    withUnderline
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-wrapper">
      <p
        className="accordion-trigger"
        onClick={event => {
          onClick && onClick(event);
          setOpen(!open);
        }}
      >
        <span className="txt">{t(textKey)}</span>
        <span>
          <FontAwesomeIcon icon={open ? iconIfOpen : iconIfClosed} />
        </span>
      </p>
      <Collapse in={open} {...props} />
      {withUnderline && <div className="underline" />}
    </div>
  );
});

Accordion.defaultProps = {
  text: "",
  iconIfClosed: faChevronRight,
  iconIfOpen: faChevronDown,
  withUnderline: true
};
