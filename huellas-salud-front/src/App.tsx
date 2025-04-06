import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/RegisterPage/Register";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./modules/Navbar/Navbar";
import Login from "./modules/Login/Login";

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
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
