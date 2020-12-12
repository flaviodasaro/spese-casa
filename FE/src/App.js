import { AppRouter } from "./ui/app-router/AppRouter";
import { Layout } from "./ui/layout/Layout";

const App = () => {
  return (
    <>
      <Layout>
        <AppRouter />
      </Layout>
    </>
  );
};

export default App;
