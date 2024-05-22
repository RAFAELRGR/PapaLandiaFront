import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPlot,
  fetchPlots,
  updatePlot,
  deletePlot,
} from "../../../Services/apiParcela";
import "./Parcela.Module.css";
import NarBar from "../NarBar/NarBar";

function Parcelas() {
  const [plotsSize, setPlotsSize] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [plots, setPlots] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPlots();
  }, []);

  const obtenerPlots = async () => {
    try {
      const data = await fetchPlots();
      setPlots(data);
    } catch (error) {
      console.error("Error al obtener las parcelas:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!plotsSize || !longitude || !latitude) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (updateMode) {
        console.log(
          "Actualizando parcela:",
          updateId,
          plotsSize,
          longitude,
          latitude
        );
        await updatePlot(updateId, plotsSize, longitude, latitude);
        setUpdateMode(false);
        setUpdateId(null);
        alert("Parcela actualizada exitosamente!");
        navigate("/parcelas");
      } else {
        console.log("Creando nueva parcela:", plotsSize, longitude, latitude);
        await createPlot(plotsSize, longitude, latitude);
        alert("Parcela creada exitosamente!");
      }

      setPlotsSize("");
      setLongitude("");
      setLatitude("");

      navigate("/parcelas");
    } catch (error) {
      console.error("Error al procesar la parcela:", error);
      setError("Ocurrió un error al procesar la parcela. Inténtalo de nuevo.");
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setPlotsSize("");
    setLongitude("");
    setLatitude("");
  };

  const handleUpdate = (id, size, lon, lat) => {
    setUpdateMode(true);
    setUpdateId(id);
    setPlotsSize(size);
    setLongitude(lon);
    setLatitude(lat);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta parcela?"
    );
    if (confirmDelete) {
      try {
        await deletePlot(id);
        alert("Parcela eliminada exitosamente!");
        obtenerPlots();
      } catch (error) {
        console.error("Error al eliminar la parcela:", error);
        setError(
          "Ocurrió un error al eliminar la parcela. Inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className="FondoParcelas">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Parcela</button>
        )}
        {isVisible && (
          <div className="Parcelas">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Parcela" : "Crear Nueva Parcela"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="plotsSize">Tamaño de la Parcela:</label>
                <input
                  type="text"
                  id="plotsSize"
                  value={plotsSize}
                  onChange={(e) => setPlotsSize(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="longitude">Longitud:</label>
                <input
                  type="text"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="latitude">Latitud:</label>
                <input
                  type="text"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Parcela
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Parcelas</h2>
        <br />
        <button onClick={obtenerPlots}>Actualizar tabla</button>
        <table className="tabla-plots">
          <thead>
            <tr>
              <th>Código de la Parcela</th>
              <th>Tamaño</th>
              <th>Longitud</th>
              <th>Latitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot) => (
              <tr key={plot.plotsId}>
                <td>{plot.plotsId}</td>
                <td>{plot.plotsSize}</td>
                <td>{plot.longitude}</td>
                <td>{plot.latitude}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        plot.plotsId,
                        plot.plotsSize,
                        plot.longitude,
                        plot.latitude
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(plot.plotsId)}>
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

export default Parcelas;
