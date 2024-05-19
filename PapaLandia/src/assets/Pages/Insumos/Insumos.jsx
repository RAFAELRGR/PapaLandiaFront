import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createInsumo,
  fetchInsumos,
  updateInsumo,
  deleteInsumo,
} from "../../../Services/apiInsumos";
import "./Insumos.Module.css";
import NarBar from "../NarBar/NarBar";

function Insumos() {
  const [insumoName, setInsumoName] = useState("");
  const [insumoDescription, setInsumoDescription] = useState("");
  const [typeSuppliesId, setTypeSuppliesId] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerInsumos();
  }, []);

  const obtenerInsumos = async () => {
    try {
      const data = await fetchInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (updateMode) {
        await updateInsumo(
          updateId,
          insumoName,
          insumoDescription,
          typeSuppliesId
        );
        setUpdateMode(false);
        setUpdateId(null);
        alert("Insumo actualizado exitosamente!");
      } else {
        await createInsumo(insumoName, insumoDescription, typeSuppliesId);
        alert("Insumo creado exitosamente!");
      }

      setInsumoName("");
      setInsumoDescription("");
      setTypeSuppliesId("");

      navigate("/insumos");
    } catch (error) {
      console.error("Error al procesar el insumo:", error);
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setInsumoName("");
    setInsumoDescription("");
    setTypeSuppliesId("");
  };

  const handleUpdate = (id, name, description, typeId) => {
    console.log(id);
    setUpdateMode(true);
    setUpdateId(id);
    setInsumoName(name);
    setInsumoDescription(description);
    setTypeSuppliesId(typeId);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este insumo?"
    );
    if (confirmDelete) {
      try {
        await deleteInsumo(id);
        alert("Insumo eliminado exitosamente!");
        obtenerInsumos();
      } catch (error) {
        console.error("Error al eliminar el insumo:", error);
        setError("Ocurrió un error al eliminar el insumo. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="FondoInsumos">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Fila</button>
        )}
        {isVisible && (
          <div className="Insumos">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Insumo" : "Crear Nuevo Insumo"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="insumoName">Nombre del Insumo:</label>
                <input
                  type="text"
                  id="insumoName"
                  value={insumoName}
                  onChange={(e) => setInsumoName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="insumoDescription">
                  Descripción del Insumo:
                </label>
                <input
                  type="text"
                  id="insumoDescription"
                  value={insumoDescription}
                  onChange={(e) => setInsumoDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="typeSuppliesId">ID del Tipo de Insumo:</label>
                <input
                  type="text"
                  id="typeSuppliesId"
                  value={typeSuppliesId}
                  onChange={(e) => setTypeSuppliesId(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Insumo
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Insumos Disponibles</h2>
        <br />
        <button onClick={obtenerInsumos}>Actualizar tabla</button>

        <table className="tabla-insumos">
          <thead>
            <tr>
              <th>Codigo del Insumo</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.suppliesId}>
                <td>{insumo.suppliesId}</td>
                <td>{insumo.suppliesName}</td>
                <td>{insumo.suppliesDescription}</td>
                <td>{insumo.typeSuppliesId}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        insumo.suppliesId,
                        insumo.suppliesName,
                        insumo.suppliesDescription,
                        insumo.typeSuppliesId
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(insumo.suppliesId)}>
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

export default Insumos;
