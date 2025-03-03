import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";

const AppRoutes = () => {
  
  const routes = useRoutes([
    { path: "/", element: <></> },
    { path: "/login", element: <Login /> },
    { path: "/registro", element: <Register /> },
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
