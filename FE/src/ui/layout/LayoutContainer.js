import { Layout } from "./Layout";
import { connect } from "react-redux";

import { closeSidebarAndResetIconClicked } from "../../redux/menu/actions";
import { isLoadingByKey } from "../../redux/loader/selectors";
import { LOADER_KEYS } from "../../redux/loader/loaderKeys";

const mapStateToProps = state => ({
    globalLoaderLoading:isLoadingByKey(LOADER_KEYS.GLOBAL)(state)
});

const mapDispatchToProps = { closeSidebarAndResetIconClicked };

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);