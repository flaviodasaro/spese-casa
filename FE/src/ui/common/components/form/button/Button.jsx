import { withNamespaces } from "react-i18next";
import "./Button.scss";

const ButtonComponent = ({ onClick, type, labelKey, theme, t }) => {
  return (
    <button type={type} onClick={onClick} className={theme + " common"}>
      {t(labelKey)}
    </button>
  );
};

ButtonComponent.defaultProps = {
    theme:'primary'
}

export const Button = withNamespaces()(ButtonComponent);