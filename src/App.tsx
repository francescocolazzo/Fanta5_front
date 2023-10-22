import { BrowserRouter } from "react-router-dom";
import CenterRoutes from "./routes/CenterRoutes";
import { NavBar } from "@/shared/components/core/index";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <hr/>
      <CenterRoutes />
    </BrowserRouter>
  );
}

export default App;
