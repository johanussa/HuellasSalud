import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/RegisterPage/Register";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./modules/Navbar/Navbar";
import Login from "./modules/Login/Login";
import Products from "./modules/Products/Products";
import ProductsAdmin from "./modules/Products/ProductsAdmin";

const AppRoutes = () => {

  const routes = useRoutes([
    { path: "/", element: <></> },
    { path: "/login", element: <Login /> },
    { path: "/registro", element: <Register /> },
    { path: "/productos", element: <Products /> },
    { path: "/productos-admin", element: <ProductsAdmin /> },
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
