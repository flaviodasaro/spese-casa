import TestComponent from "./TestComponent";
import { connect } from "react-redux";
import { testDispatch } from "../../redux/test/actions";

const mapStateToProps = (state, ownProps) => ({
    input:state.testReducer.input
});
const mapDispatchToProps = { testDispatch };

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
