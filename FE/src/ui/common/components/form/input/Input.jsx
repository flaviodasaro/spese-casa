import { TextField } from "@material-ui/core";

/**
 * 
 * For now just a wrapper
 */
const Input = props => <TextField {...props} />;

Input.defaultProps = {
    type:'text'
};

export { Input };