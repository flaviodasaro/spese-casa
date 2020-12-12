import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";

const AddUserPageComponent = props => {
  return <>{"ADD USER PAGE"}</>;
};

export const AddUserPage = withChangeIconOnInit(USERS_KEY)(AddUserPageComponent);