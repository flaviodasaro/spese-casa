import { useState } from "react";
import { SidebarContainer } from "./sidebar/SidebarContainer";
import { SecondLevelSidebar } from "./secondLevelSidebar/SecondLevelSidebar";
import { Content } from "./content/Content";
import "./Layout.scss";

export const Layout = props => {
  const [closed, setClosed] = useState(true);
  return (
    <div>
      <SidebarContainer onClickSidebar={() => setClosed(false)} />
      <SecondLevelSidebar closed={closed} onClick={() => setClosed(true)} />
      <Content>{props.children}</Content>
    </div>
  );
};
