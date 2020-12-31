import { TextField } from "@material-ui/core";
import { CustomCheckbox } from "../custom-checkbox/CustomCheckbox";
import { CustomSelect } from "../custom-select/CustomSelect";
import { withNamespaces } from "react-i18next";
import { MultipleSelect } from "../multiple-select/MultipleSelect";
/**
 *
 * For now just a wrapper
 */
const Input = withNamespaces()(props => {
  const { t, type, labelKey } = props;
  const newProps = { ...props, label: t(labelKey) };
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
    default: {
      return <TextField {...newProps} />;
    }
  }
});

Input.defaultProps = {
  type: "text"
};

export { Input };
