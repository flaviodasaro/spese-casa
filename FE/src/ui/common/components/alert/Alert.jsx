import { useEffect } from "react";
import { withNamespaces } from "react-i18next";
import {
  ALERT_TYPE_ERROR,
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_INFO
} from "../../../../redux/common/constants";

import "./Alert.scss";

import {
  faCheck,
  faInfoCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapTypeToLabelKey = {
  [ALERT_TYPE_ERROR]: "ALERT.ERROR",
  [ALERT_TYPE_SUCCESS]: "ALERT.SUCCESS",
  [ALERT_TYPE_INFO]: "ALERT.INFO"
};

const mapTypeToIcon = {
  [ALERT_TYPE_ERROR]: faExclamationTriangle,
  [ALERT_TYPE_SUCCESS]: faCheck,
  [ALERT_TYPE_INFO]: faInfoCircle
};

const addShowClass = show => (show ? " open" : "");

const AlertBox = ({ show, hideCallback, showTime, type, t }) => {
  useEffect(() => {
    show && hideCallback && setTimeout(hideCallback, showTime);
  }, [show]);
  return (
    <div className={`alert-box ${type}${addShowClass(show)}`}>
      <span className="txt">{t(mapTypeToLabelKey[type])}</span>
      <FontAwesomeIcon icon={mapTypeToIcon[type]} color="white" size="2x" />
    </div>
  );
};

AlertBox.defaultProps = {
  show: false,
  showTime: 2500,
  type: "error"
};

export const Alert = withNamespaces()(AlertBox);
