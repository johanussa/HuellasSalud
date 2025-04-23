import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/RegisterPage/Register";
import Navbar from "./modules/Navbar/Navbar";
import Login from "./modules/Login/Login";
import Products from "./modules/Products/Products";
import ProductsAdmin from "./modules/Products/ProductsAdmin";
import Users from "./modules/Users/Users";
import Pets from "./modules/Pets/Pets";
import History from "./modules/History/History";
import Home from "./modules/Home/Home";
import Contact from "./modules/Contact/Contact";
import Services from "./modules/Services/Services";

const AppRoutes = () => {

  const routes = useRoutes([
    { path: "/", element: <Home/> },
    { path: "/login", element: <Login /> },
    { path: "/registro", element: <Register /> },
    { path: "/productos", element: <Products /> },
    { path: "/productos-admin", element: <ProductsAdmin /> },
    { path: "/usuarios", element: <Users /> },
    { path: "/mascotas", element: <Pets /> },
    { path: "/historial", element: <History /> },
    { path: "/inicio", element: <Home/>},
    { path: "/contacto", element: <Contact/>},
    { path: "/servicios", element: <Services/>}
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
