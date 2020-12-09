import { useState } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { SecondLevelSidebar } from "./secondLevelSidebar/SecondLevelSidebar";
import { Content } from "./content/Content";
import "./Layout.scss";

export const Layout = props => {
  const [closed, setClosed] = useState(true);
  return (
    <div>
      <Sidebar onClickSidebar={() => setClosed(false)} />
      <SecondLevelSidebar closed={closed} onClick={() => setClosed(true)} />
      <Content>{props.children}</Content>
    </div>
  );
};
