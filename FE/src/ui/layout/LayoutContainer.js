import { Layout } from "./Layout";
import { connect } from "react-redux";

import { closeSidebarAndResetIconClicked } from "../../redux/menu/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = { closeSidebarAndResetIconClicked };

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);