import { withNamespaces } from "react-i18next";
import "./GenericForm.scss";
import { Button } from "../button/Button";

const GenericFormComponent = ({
  preventDefaultOnSubmit,
  onSubmit,
  onClearForm,
  submitLabelKey,
  withClearButton,
  clearLabelKey,
  disableSubmitBtn,
  disableClearBtn,
  children,
  t
}) => {
  const handleSubmit = event => {
    if (preventDefaultOnSubmit) {
      event.preventDefault();
    }
    onSubmit({
      originalEvent: event,
      formDataEntries: new FormData(event.target).entries()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-tag">
      <div className="inputs-container">{children}</div>
      <div className="submit-container">
        <Button
          type="submit"
          labelKey={t(submitLabelKey)}
          disabled={disableSubmitBtn}
        />
        {withClearButton && (
          <span className="clear-btn-wrapper">
            <Button
              type="button"
              theme="secondary"
              labelKey={t(clearLabelKey)}
              onClick={onClearForm}
              disabled={disableClearBtn}
            />
          </span>
        )}
      </div>
    </form>
  );
};

GenericFormComponent.defaultProps = {
  preventDefaultOnSubmit: true,
  useInternalState: true,
  submitLabelKey: "COMMON.FORM.SUBMIT",
  clearLabelKey: "COMMON.FORM.RESET",
  withClearButton: true,
  disableSubmitBtn: false,
  disableClearBtn: false
};

export const GenericForm = withNamespaces()(GenericFormComponent);
