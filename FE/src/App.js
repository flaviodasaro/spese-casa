import { AppRouter } from "./ui/app-router/AppRouter";
import { LayoutContainer } from "./ui/layout/LayoutContainer";

const App = () => {
  return (
    <>
      <LayoutContainer>
        <AppRouter />
      </LayoutContainer>
    </>
  );
};

export default App;
