import { useHistory } from "react-router-dom";
export const Home = props => {
  const history = useHistory();
  return <div onClick={() => history.push("/tutorial")}>AAA</div>;
};
