import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./assets/Pages/Home/Home";
import Login from "./assets/Pages/Login/Login";
import About from "./assets/Pages/About/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/About" element={<About></About>}></Route>
    </Routes>
  );
}

export default App;
