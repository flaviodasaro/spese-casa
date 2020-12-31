import { FormControl, InputLabel, Select } from "@material-ui/core";

export const CustomSelect = ({
  label,
  value,
  name,
  onChange,
  optionList,
  noneElement,
  noneElementLabel
}) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        inputProps={{
          name
        }}
      >
        {noneElement && <option aria-label={noneElementLabel} value="" />}
        {optionList.map(op => (
          <option value={op.value}>{op.text}</option>
        ))}
      </Select>
    </FormControl>
  );
};

CustomSelect.defaultProps = {
  optionList: [],
  noneElement: true,
  noneElementLabel: "None"
};
