import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./assets/Pages/Home/Home";
import Login from "./assets/Pages/Login/Login";
import About from "./assets/Pages/About/About";
import Register from "./assets/Pages/Registrer/Registrer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
