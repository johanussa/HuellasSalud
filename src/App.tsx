import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./modules/Navbar/Navbar";
import Products from "./modules/Products/Products";

const AppRoutes = () => {

  const routes = useRoutes([
    { path: "/", element: <></> },
    { path: "/login", element: <Login /> },
    { path: "/registro", element: <Register /> },
    { path: "/productos", element: <Products /> },
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
