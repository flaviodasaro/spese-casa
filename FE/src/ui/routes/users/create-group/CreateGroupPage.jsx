import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";

const CreateGroupPageComponent = props => {
  return <>{"CreateGroupPage"}</>;
};

export const CreateGroupPage = withChangeIconOnInit(USERS_KEY)(
  CreateGroupPageComponent
);
