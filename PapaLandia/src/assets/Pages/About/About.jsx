import "./About.Module.css";
import NarBar from "../NarBar/NarBar";
function About() {
  return (
    <div>
      <NarBar></NarBar>
      <div>
        <img className="AboutImg" src="/About.jpg" alt="" />
      </div>
      <div className="Color bg-green-800 text-white p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">ACERCA DE</h2>
        <p className="text-sm">
          En PapaLandia nos enfocamos en una experiencia divertida y educativa
          con el fin de proporcionar una visión cercana a la gestión de cultivos
          con información actualizada, además encontrarás información muy útil
          acerca de cultivos, papas, plagas, entre otras... ¡Que esperas para
          iniciar tu aventura!
        </p>
      </div>
    </div>
  );
}

export default About;
