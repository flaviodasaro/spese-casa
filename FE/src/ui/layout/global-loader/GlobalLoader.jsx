import { CircularProgress } from "@material-ui/core";
import "./GlobalLoader.scss";

export const GlobalLoader = ({ loading }) => {
  if (loading) {
    return (
      <>
        <div className="overlay"></div>
        <div className="loader-container">
          <CircularProgress />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
