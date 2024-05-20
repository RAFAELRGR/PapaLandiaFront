import { useEffect, useState } from "react";
import NarBar from "../NarBar/NarBar";
import {
  fetchLogros,
  fetchGamesAchievements,
} from "../../../Services/apiLogros";
import "./Logros.Module.css";

function Logros() {
  const [logros, setLogros] = useState([]);
  const [gamesLogros, setGamesLogros] = useState([]);
  const [errorLogros, setErrorLogros] = useState(null);
  const [errorGamesLogros, setErrorGamesLogros] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const obtenerLogros = async () => {
      try {
        const data = await fetchLogros();
        setLogros(data);
      } catch (error) {
        setErrorLogros(error.message);
      }
    };

    const obtenerGamesLogros = async () => {
      try {
        const data = await fetchGamesAchievements();
        setGamesLogros(data);
      } catch (error) {
        setErrorGamesLogros(error.message);
      }
    };

    obtenerLogros();
    obtenerGamesLogros();
  }, []);

  const sortGamesLogros = () => {
    const sortedLogros = [...gamesLogros].sort((a, b) => {
      const dateA = new Date(a.achievementUnlocked);
      const dateB = new Date(b.achievementUnlocked);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setGamesLogros(sortedLogros);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="FondoLogro">
      <NarBar />
      <br />
      <div className="ContenedorLogros">
        <div className="TituloLogros">
          <h1>LOGROS</h1>
        </div>
        {errorLogros ? (
          <div className="Error">{errorLogros}</div>
        ) : (
          <table className="TablaLogros">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {logros.map((logro) => (
                <tr key={logro.achievementsId}>
                  <td>{logro.achievementsId}</td>
                  <td>{logro.achievementsName}</td>
                  <td>{logro.achievementsDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <div className="TituloLogros">
          <h1>LOGROS DE JUEGO DESBLOQUEADO</h1>
        </div>
        <button className="BotonOrdenar" onClick={sortGamesLogros}>
          Ordenar por Fecha {sortOrder === "asc" ? "↓" : "↑"}
        </button>
        {errorGamesLogros ? (
          <div className="Error">{errorGamesLogros}</div>
        ) : (
          <table className="TablaLogros">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Desbloqueo</th>
                <th>ID de Logro</th>
                <th>ID de Juego</th>
              </tr>
            </thead>
            <tbody>
              {gamesLogros.map((gameLogro) => (
                <tr key={gameLogro.achievementUnlockedId}>
                  <td>{gameLogro.achievementUnlockedId}</td>
                  <td>
                    {new Date(gameLogro.achievementUnlocked).toLocaleString()}
                  </td>
                  <td>{gameLogro.achievementId}</td>
                  <td>{gameLogro.gameId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Logros;
