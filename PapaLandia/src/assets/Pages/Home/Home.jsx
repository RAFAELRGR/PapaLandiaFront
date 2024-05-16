import Carrusel from "../Carrusel/Carrusel";
import NarBar from "../NarBar/NarBar";
import "./Home.Module.css";
import Carts from "../Carts/Carts";
function Home() {
  return (
    <div className="Background">
      <NarBar></NarBar>
      <br></br>
      <br />
      <Carrusel></Carrusel>
      <br />
      <h1>------- ------- GESTION DE TU CULTIVO ------- -------</h1>
      <br />
      <Carts></Carts>
      <br />
      <h1>------- ------- --------------------- ------- -------</h1>
    </div>
  );
}

export default Home;
