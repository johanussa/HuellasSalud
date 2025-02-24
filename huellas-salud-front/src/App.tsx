import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <></> },
    { path: "/login", element: <Login /> },
  ]);

  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
