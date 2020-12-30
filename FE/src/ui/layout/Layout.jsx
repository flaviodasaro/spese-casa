import { SidebarContainer } from "./sidebar/SidebarContainer";
import { SecondLevelSidebarContainer } from "./second-level-sidebar/SecondLevelSidebarContainer";
import { Content } from "./content/Content";
import { FeedbackManagerContainer } from "./feedback-manager/FeedbackManagerContainer";
import "./Layout.scss";
import { GlobalLoader } from "./global-loader/GlobalLoader";

export const Layout = ({children, closeSidebarAndResetIconClicked}) => {
  
  return (
    <div>
      <SidebarContainer />
      <SecondLevelSidebarContainer />
      <Content onClick={closeSidebarAndResetIconClicked}>{children}</Content>
      <FeedbackManagerContainer />
      <GlobalLoader />
    </div>
  );
};
