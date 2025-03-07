import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
