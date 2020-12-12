import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";

const ManageUsersPageComponent = props => {
  return <>{"ManageUsersPage"}</>;
};

export const ManageUsersPage = withChangeIconOnInit(USERS_KEY)(
  ManageUsersPageComponent
);
