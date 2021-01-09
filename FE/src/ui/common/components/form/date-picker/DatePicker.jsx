import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export const DatePicker = props => {
  const { label, dateFormat, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format={dateFormat}
        margin="normal"
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.defaultProps = {
  dateFormat: "dd/MM/yyyy"
};
