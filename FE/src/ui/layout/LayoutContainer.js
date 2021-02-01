import { Layout } from "./Layout";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { closeSidebarAndResetIconClicked } from "../../redux/menu/actions";
import { isLoadingByKey } from "../../redux/loader/selectors";
import { LOADER_KEYS } from "../../redux/loader/loaderKeys";

const mapStateToProps = state => ({
    globalLoaderLoading:isLoadingByKey(LOADER_KEYS.GLOBAL)(state)
});

const mapDispatchToProps = { closeSidebarAndResetIconClicked, push };

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);