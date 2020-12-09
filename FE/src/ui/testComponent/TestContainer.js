import TestComponent from "./TestComponent";
import { connect } from "react-redux";
import { testDispatch } from "../../redux/test/actions";
import { getTestInput } from "../../redux/test/selectors";

const mapStateToProps = (state) => ({
    input:getTestInput(state)
});
const mapDispatchToProps = { testDispatch };

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
