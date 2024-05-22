import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCrop,
  fetchCrops,
  updateCrop,
  deleteCrop,
} from "../../../Services/apiCrops";
import "./Cultivo.Module.css";
import NarBar from "../NarBar/NarBar";

function Cultivos() {
  const [plotsId, setPlotsId] = useState("");
  const [potatoesId, setPotatoesId] = useState("");
  const [pestId, setPestId] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [stateCropsId, setStateCropsId] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [crops, setCrops] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerCultivos();
  }, []);

  const obtenerCultivos = async () => {
    try {
      const data = await fetchCrops();
      setCrops(data);
    } catch (error) {
      console.error("Error al obtener los cultivos:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!plotsId || !potatoesId || !pestId || !sowingDate || !stateCropsId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (updateMode) {
        const response = await updateCrop(
          updateId,
          plotsId,
          potatoesId,
          pestId,
          sowingDate,
          stateCropsId
        );
        console.log("Respuesta al actualizar cultivo:", response.message);
        setUpdateMode(false);
        setUpdateId(null);
        alert(response.message);
        navigate("/cultivos");
      } else {
        const response = await createCrop(
          plotsId,
          potatoesId,
          pestId,
          sowingDate,
          stateCropsId
        );
        console.log("Respuesta al crear cultivo:", response.message);
        alert(response.message);
      }

      setPlotsId("");
      setPotatoesId("");
      setPestId("");
      setSowingDate("");
      setStateCropsId("");

      obtenerCultivos();
    } catch (error) {
      console.error("Error al procesar el cultivo:", error);
      setError("Ocurrió un error al procesar el cultivo. Inténtalo de nuevo.");
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setPlotsId("");
    setPotatoesId("");
    setPestId("");
    setSowingDate("");
    setStateCropsId("");
  };

  const handleUpdate = (
    id,
    plotsId,
    potatoesId,
    pestId,
    sowingDate,
    stateCropsId
  ) => {
    setUpdateMode(true);
    setUpdateId(id);
    setPlotsId(plotsId);
    setPotatoesId(potatoesId);
    setPestId(pestId);
    setSowingDate(sowingDate);
    setStateCropsId(stateCropsId);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este cultivo?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteCrop(id);
        console.log("Respuesta al eliminar cultivo:", response.message);
        alert(response.message);
        obtenerCultivos();
      } catch (error) {
        console.error("Error al eliminar el cultivo:", error);
        setError(
          "Ocurrió un error al eliminar el cultivo. Inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className="FondoCultivos">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Cultivo</button>
        )}
        {isVisible && (
          <div className="Cultivos">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Cultivo" : "Crear Nuevo Cultivo"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="plotsId">ID de la Parcela:</label>
                <input
                  type="text"
                  id="plotsId"
                  value={plotsId}
                  onChange={(e) => setPlotsId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="potatoesId">ID de la Papa:</label>
                <input
                  type="text"
                  id="potatoesId"
                  value={potatoesId}
                  onChange={(e) => setPotatoesId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pestId">ID de la Plaga:</label>
                <input
                  type="text"
                  id="pestId"
                  value={pestId}
                  onChange={(e) => setPestId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sowingDate">Fecha de Siembra:</label>
                <input
                  type="date"
                  id="sowingDate"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="stateCropsId">ID del Estado del Cultivo:</label>
                <input
                  type="text"
                  id="stateCropsId"
                  value={stateCropsId}
                  onChange={(e) => setStateCropsId(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Cultivo
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Cultivos</h2>
        <br />
        <button onClick={obtenerCultivos}>Actualizar tabla</button>
        <table className="tabla-cultivos">
          <thead>
            <tr>
              <th>ID del Cultivo</th>
              <th>ID de la Parcela</th>
              <th>ID de la Papa</th>
              <th>ID de la Plaga</th>
              <th>Fecha de Siembra</th>
              <th>ID del Estado del Cultivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((cultivo) => (
              <tr key={cultivo.cropsId}>
                <td>{cultivo.cropsId}</td>
                <td>{cultivo.plotsId}</td>
                <td>{cultivo.potatoesId}</td>
                <td>{cultivo.pestId}</td>
                <td>{cultivo.sowingDate}</td>
                <td>{cultivo.stateCropsId}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        cultivo.cropsId,
                        cultivo.plotsId,
                        cultivo.potatoesId,
                        cultivo.pestId,
                        cultivo.sowingDate,
                        cultivo.stateCropsId
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(cultivo.cropsId)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cultivos;
