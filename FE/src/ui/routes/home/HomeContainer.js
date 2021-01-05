import { Home } from "./Home";
import { connect } from "react-redux";

import { init } from "../../../redux/home/actions";
import {
  getUsernameUtentePagatoPiuVolte,
  getNameGruppoPartecipatoPiuVolte,
  getNameUtenteBigPay
} from "../../../redux/home/selectors";

const mapStateToProps = state => ({
  usernameUtentePagatoPiuVolte: getUsernameUtentePagatoPiuVolte(state),
  nameGruppoPartecipatoPiuVolte: getNameGruppoPartecipatoPiuVolte(state),
  nameUtenteBigPay: getNameUtenteBigPay(state)
});
const mapDispatchToProps = { init };

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
