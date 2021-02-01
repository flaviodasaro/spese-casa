import { useEffect } from "react";
import { SidebarContainer } from "./sidebar/SidebarContainer";
import { SecondLevelSidebarContainer } from "./second-level-sidebar/SecondLevelSidebarContainer";
import { Content } from "./content/Content";
import { FeedbackManagerContainer } from "./feedback-manager/FeedbackManagerContainer";
import "./Layout.scss";
import { GlobalLoader } from "./global-loader/GlobalLoader";

export const Layout = ({children, closeSidebarAndResetIconClicked, globalLoaderLoading, push}) => {
   useEffect(() => {
     const navigationEntry = window.performance.getEntriesByType("navigation");
    if(navigationEntry && navigationEntry[0].type === "reload"){
      const route = window.location.pathname;
      setTimeout(() => push(route), 0);
    }
  }, []);
  return (
    <div>
      <SidebarContainer />
      <SecondLevelSidebarContainer />
      <Content onClick={closeSidebarAndResetIconClicked}>{children}</Content>
      <FeedbackManagerContainer />
      <GlobalLoader loading={globalLoaderLoading} />
    </div>
  );
};
