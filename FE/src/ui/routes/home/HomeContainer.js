import { Home } from "./Home";
import { connect } from "react-redux";

import { init } from "../../../redux/home/actions";
import {
    dataForHome
} from "../../../redux/home/selectors";

const mapStateToProps = state => ({
    dataForHome:dataForHome(state)
});
const mapDispatchToProps = { init };

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
