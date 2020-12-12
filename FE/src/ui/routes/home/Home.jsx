import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { HOME_KEY } from "../../common/constants";

const HomeComponent = props => {
  return <div>AAA</div>;
};

export const Home = withChangeIconOnInit(HOME_KEY)(HomeComponent);