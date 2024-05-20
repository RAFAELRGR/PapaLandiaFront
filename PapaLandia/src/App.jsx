import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./assets/Pages/Home/Home";
import Login from "./assets/Pages/Login/Login";
import About from "./assets/Pages/About/About";
import Register from "./assets/Pages/Registrer/Registrer";
import Insumos from "./assets/Pages/Insumos/Insumos";
import RequireAuth from "./Components/RequireAuth";
import Pests from "./assets/Pages/Plagas/Plagas";
import Potatoes from "./assets/Pages/Potatoes/Potatoes";
import Logros from "./assets/Pages/Logros/Logros";
import Tareas from "./assets/Pages/Tareas/Tareas";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/insumos" element={<Insumos />} />
        <Route path="/papas" element={<Potatoes />} />
        <Route path="/plagas" element={<Pests />} />
        <Route path="/logros" element={<Logros />} />
        <Route path="/tareas" element={<Tareas />} />
      </Route>
    </Routes>
  );
}

export default App;
