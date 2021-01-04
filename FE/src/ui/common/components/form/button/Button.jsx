import { withNamespaces } from "react-i18next";
import "./Button.scss";

const ButtonComponent = ({ onClick, type, labelKey, disabled, theme, t, children, width }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={theme + " common"}
      style={{width}}
      disabled={disabled}
    >
      {labelKey && t(labelKey)}
      {children}
    </button>
  );
};

ButtonComponent.defaultProps = {
  theme: "primary",
  disabled: false,
  type: "button",
  width:"250px"

};

export const Button = withNamespaces()(ButtonComponent);
