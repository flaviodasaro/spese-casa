import { TextField } from "@material-ui/core";
import { CustomCheckbox } from "../custom-checkbox/CustomCheckbox";
import { CustomSelect } from "../custom-select/CustomSelect";
import { withNamespaces } from "react-i18next";
import { MultipleSelect } from "../multiple-select/MultipleSelect";
import { DatePicker } from "../date-picker/DatePicker";

const defaultOnChange = (
  onChange,
  onChangeByValue,
  validateChangeFn,
  valueGetterByEvent = event => event.target.value
) => event => {
  onChange && onChange(event);
  const value = valueGetterByEvent(event);
  if (!validateChangeFn || validateChangeFn(value)) {
    onChangeByValue && onChangeByValue(value);
  }
};

/**
 *
 * For now just a wrapper
 */
const Input = withNamespaces()(props => {
  const { t, type, labelKey, onChangeByValue, onChange } = props;
  const newProps = {
    ...props,
    label: t(labelKey),
    onChange: defaultOnChange(onChange, onChangeByValue)
  };
  switch (type) {
    case "select": {
      return <CustomSelect {...newProps} />;
    }
    case "multiple-select": {
      return <MultipleSelect {...newProps} />;
    }
    case "checkbox": {
      return <CustomCheckbox {...newProps} />;
    }
    case "date-picker": {
      return (
        <DatePicker
          {...newProps}
          onChange={defaultOnChange(
            onChange,
            onChangeByValue,
            null,
            event => event
          )}
        />
      );
    }
    case "number": {
      return (
        <TextField
          {...newProps}
          onChange={defaultOnChange(
            onChange,
            onChangeByValue,
            value => !isNaN(value)
          )}
        />
      );
    }
    default: {
      return <TextField {...newProps} />;
    }
  }
});

Input.defaultProps = {
  type: "text"
};

export { Input };
