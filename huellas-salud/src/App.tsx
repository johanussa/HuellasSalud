import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const AppRoutes = () => {
  
  const routes = useRoutes([
    { path: "/", element: <></> }
  ]);
  
  return routes;
}

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
