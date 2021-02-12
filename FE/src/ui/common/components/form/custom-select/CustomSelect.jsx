import { FormControl, InputLabel, Select } from "@material-ui/core";

export const CustomSelect = ({
  label,
  value,
  name,
  onChange,
  optionList,
  noneElement,
  noneElementLabel,
  valueOptionProp,
  textOptionProp
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
        {optionList.map(op => {
          const value = op[valueOptionProp];
          return (
          <option key={value} value={value}>{op[textOptionProp]}</option>
        )})}
      </Select>
    </FormControl>
  );
};

CustomSelect.defaultProps = {
  optionList: [],
  noneElement: true,
  noneElementLabel: "None",
  valueOptionProp:"value",
  textOptionProp:"text"
};
