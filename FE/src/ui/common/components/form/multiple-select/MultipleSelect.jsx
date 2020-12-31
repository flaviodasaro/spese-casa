import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const DefaultMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const MultipleSelect = ({
  label,
  value,
  name,
  onChange,
  MenuProps,
  optionList,
  valueOptionProp,
  textOptionProp
}) => {
  return (
    <FormControl >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        name={name}
        value={value}
        onChange={onChange}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {optionList.map(option => (
          <MenuItem
            key={option[valueOptionProp]}
            value={option[valueOptionProp]}
          >
            {option[textOptionProp]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultipleSelect.defaultProps = {
  MenuProps: DefaultMenuProps,
  optionList: [],
  value:[],
  valueOptionProp: "value",
  textOptionProp: "text"
};
