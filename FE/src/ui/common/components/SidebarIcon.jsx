import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withHover } from "../hocs/withHover";

export const SidebarIcon = ({ tootlipMessage, iconName }) => {
  const FinalComponent = withHover(tootlipMessage)(FontAwesomeIcon);
  return (
    <>
      {FinalComponent && <FinalComponent icon={iconName} color="white" size="3x" />}
    </>
  );
};
