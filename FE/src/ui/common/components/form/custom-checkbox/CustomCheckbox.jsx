import { Checkbox, FormControlLabel } from "@material-ui/core";

export const CustomCheckbox = ({ checked, onChange, name, color, label }) => {
  return (
    <div className="MuiFormControl-root MuiTextField-root">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            name={name}
            value={checked}
            color={color}
          />
        }
        label={label}
      />
    </div>
  );
};

CustomCheckbox.defaultProps = {
  checked: false,
  onChange: console.log,
  color: "primary"
};
