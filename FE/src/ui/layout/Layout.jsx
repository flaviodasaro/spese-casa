import { SidebarContainer } from "./sidebar/SidebarContainer";
import { SecondLevelSidebarContainer } from "./second-level-sidebar/SecondLevelSidebarContainer";
import { Content } from "./content/Content";
import { FeedbackManagerContainer } from "../common/components/feedback-manager/FeedbackManagerContainer";
import "./Layout.scss";

export const Layout = ({children, closeSidebarAndResetIconClicked}) => {
  return (
    <div>
      <SidebarContainer />
      <SecondLevelSidebarContainer />
      <Content onClick={closeSidebarAndResetIconClicked}>{children}</Content>
      <FeedbackManagerContainer />
    </div>
  );
};
