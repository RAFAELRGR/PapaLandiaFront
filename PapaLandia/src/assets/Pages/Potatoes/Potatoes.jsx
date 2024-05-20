import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPotato,
  fetchPotatoes,
  updatePotato,
  deletePotato,
} from "../../../Services/apiPapas";
import "./Potatoes.Module.css";
import NarBar from "../NarBar/NarBar";
import CartsPotatoes from "../CartsPotatoes/CartsPotatoes";

function Papas() {
  const [potatoesName, setPotatoesName] = useState("");
  const [description, setDescription] = useState("");
  const [timeGrowth, setTimeGrowth] = useState("");
  const [typePotatoesId, setTypePotatoesId] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [potatoes, setPotatoes] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPapas();
  }, []);

  const obtenerPapas = async () => {
    try {
      const data = await fetchPotatoes();
      setPotatoes(data);
    } catch (error) {
      console.error("Error al obtener las papas:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!potatoesName || !description || !timeGrowth || !typePotatoesId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (updateMode) {
        console.log(
          "Actualizando papa:",
          updateId,
          potatoesName,
          description,
          timeGrowth,
          typePotatoesId
        );
        await updatePotato(
          updateId,
          potatoesName,
          description,
          timeGrowth,
          typePotatoesId
        );
        setUpdateMode(false);
        setUpdateId(null);
        alert("Papa actualizada exitosamente!");
        navigate("/papas");
      } else {
        console.log(
          "Creando nueva papa:",
          potatoesName,
          description,
          timeGrowth,
          typePotatoesId
        );
        await createPotato(
          potatoesName,
          description,
          timeGrowth,
          typePotatoesId
        );
        alert("Papa creada exitosamente!");
      }

      setPotatoesName("");
      setDescription("");
      setTimeGrowth("");
      setTypePotatoesId("");

      navigate("/papas");
    } catch (error) {
      console.error("Error al procesar la papa:", error);
      setError("Ocurrió un error al procesar la papa. Inténtalo de nuevo.");
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setPotatoesName("");
    setDescription("");
    setTimeGrowth("");
    setTypePotatoesId("");
  };

  const handleUpdate = (id, name, description, timeGrowth, typePotatoesId) => {
    setUpdateMode(true);
    setUpdateId(id);
    setPotatoesName(name);
    setDescription(description);
    setTimeGrowth(timeGrowth);
    setTypePotatoesId(typePotatoesId);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta papa?"
    );
    if (confirmDelete) {
      try {
        await deletePotato(id);
        alert("Papa eliminada exitosamente!");
        obtenerPapas();
      } catch (error) {
        console.error("Error al eliminar la papa:", error);
        setError("Ocurrió un error al eliminar la papa. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="FondoPapas">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Papa</button>
        )}
        {isVisible && (
          <div className="Papas">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Papa" : "Crear Nueva Papa"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="potatoesName">Nombre de la Papa:</label>
                <input
                  type="text"
                  id="potatoesName"
                  value={potatoesName}
                  onChange={(e) => setPotatoesName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Descripción de la Papa:</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="timeGrowth">Tiempo de Crecimiento:</label>
                <input
                  type="number"
                  id="timeGrowth"
                  value={timeGrowth}
                  onChange={(e) => setTimeGrowth(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="typePotatoesId">ID del Tipo de Papa:</label>
                <input
                  type="number"
                  id="typePotatoesId"
                  value={typePotatoesId}
                  onChange={(e) => setTypePotatoesId(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Papa
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Papas que Manejas</h2>
        <br />
        <button onClick={obtenerPapas}>Actualizar tabla</button>
        <table className="tabla-papas">
          <thead>
            <tr>
              <th>Código de la Papa</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Tiempo de Crecimiento</th>
              <th>ID del Tipo de Papa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {potatoes.map((potato) => (
              <tr key={potato.potatoesId}>
                <td>{potato.potatoesId}</td>
                <td>{potato.potatoesName}</td>
                <td>{potato.description}</td>
                <td>{potato.timeGrowth}</td>
                <td>{potato.typePotatoesId}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        potato.potatoesId,
                        potato.potatoesName,
                        potato.description,
                        potato.timeGrowth,
                        potato.typePotatoesId
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(potato.potatoesId)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h2>Papas mas comunes en Colombia</h2>
      <br />
      <CartsPotatoes></CartsPotatoes>
      <br />
    </div>
  );
}
export default Papas;
