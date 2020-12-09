import { AppRouter } from "./ui/appRouter/AppRouter";
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
