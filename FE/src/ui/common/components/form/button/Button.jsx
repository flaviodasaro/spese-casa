import { withNamespaces } from "react-i18next";
import "./Button.scss";

const ButtonComponent = ({ onClick, type, labelKey, disabled, theme, t }) => {
  return (
    <button type={type} onClick={onClick} className={theme + " common"} disabled={disabled}>
      {t(labelKey)}
    </button>
  );
};

ButtonComponent.defaultProps = {
    theme:'primary',
    disabled:false
}

export const Button = withNamespaces()(ButtonComponent);
