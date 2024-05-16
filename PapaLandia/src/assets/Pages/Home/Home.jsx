import Carrusel from "../Carrusel/Carrusel";
import NarBar from "../NarBar/NarBar";
import "./Home.Module.css";

function Home() {
  return (
    <div className="Background">
      <NarBar></NarBar>
      <h1>Holi</h1>
      <Carrusel></Carrusel>
    </div>
  );
}

export default Home;
