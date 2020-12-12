import "./SecondLevelSidebar.scss";
import { SecondLevelSidebarContent } from "./second-level-sidebar-content/SecondLevelSidebarContent";

export const SecondLevelSidebar = props => {
  const {
    secondLevelSidebarOpen,
    clickedIcon,
    navigateAndCloseSidebar
  } = props;
  return (
    <div
      className={`second-level-sidebar ${
        secondLevelSidebarOpen ? "open" : "closed"
      }`}
    >
      <SecondLevelSidebarContent
        clickedIcon={clickedIcon}
        navigateAndCloseSidebar={navigateAndCloseSidebar}
      />
    </div>
  );
};
