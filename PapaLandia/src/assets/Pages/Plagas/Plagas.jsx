import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPest,
  fetchPests,
  updatePest,
  deletePest,
} from "../../../Services/apiPests";
import "./Plagas.Module.css";
import NarBar from "../NarBar/NarBar";
import CartsPlagas from "../CartsPlagas/CartsPlagas";

function Pests() {
  const [pestsName, setPestsName] = useState("");
  const [pestsDescription, setPestsDescription] = useState("");
  const [suppliesId, setSuppliesId] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [pests, setPests] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPests();
  }, []);

  const obtenerPests = async () => {
    try {
      const data = await fetchPests();
      setPests(data);
    } catch (error) {
      console.error("Error al obtener las plagas:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!pestsName || !pestsDescription || !suppliesId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (updateMode) {
        console.log(
          "Actualizando plaga:",
          updateId,
          pestsName,
          pestsDescription,
          suppliesId
        );
        await updatePest(updateId, pestsName, pestsDescription, suppliesId);
        setUpdateMode(false);
        setUpdateId(null);
        alert("Plaga actualizada exitosamente!");
        navigate("/plagas");
      } else {
        console.log(
          "Creando nueva plaga:",
          pestsName,
          pestsDescription,
          suppliesId
        );
        await createPest(pestsName, pestsDescription, suppliesId);
        alert("Plaga creada exitosamente!");
      }

      setPestsName("");
      setPestsDescription("");
      setSuppliesId("");

      navigate("/plagas");
    } catch (error) {
      console.error("Error al procesar la plaga:", error);
      setError("Ocurrió un error al procesar la plaga. Inténtalo de nuevo.");
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setPestsName("");
    setPestsDescription("");
    setSuppliesId("");
  };

  const handleUpdate = (id, name, description, suppliesId) => {
    setUpdateMode(true);
    setUpdateId(id);
    setPestsName(name);
    setPestsDescription(description);
    setSuppliesId(suppliesId);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta plaga?"
    );
    if (confirmDelete) {
      try {
        await deletePest(id);
        alert("Plaga eliminada exitosamente!");
        obtenerPests();
      } catch (error) {
        console.error("Error al eliminar la plaga:", error);
        setError("Ocurrió un error al eliminar la plaga. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="FondoPests">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Plaga</button>
        )}
        {isVisible && (
          <div className="Pests">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Plaga" : "Crear Nueva Plaga"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="pestsName">Nombre de la Plaga:</label>
                <input
                  type="text"
                  id="pestsName"
                  value={pestsName}
                  onChange={(e) => setPestsName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pestsDescription">
                  Descripción de la Plaga:
                </label>
                <input
                  type="text"
                  id="pestsDescription"
                  value={pestsDescription}
                  onChange={(e) => setPestsDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="suppliesId">ID del Pesticida:</label>
                <input
                  type="text"
                  id="suppliesId"
                  value={suppliesId}
                  onChange={(e) => setSuppliesId(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Plaga
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Plagas</h2>
        <br />
        <button onClick={obtenerPests}>Actualizar tabla</button>
        <table className="tabla-pests">
          <thead>
            <tr>
              <th>Código de la Plaga</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>ID del Insumo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pests.map((pest) => (
              <tr key={pest.pestsId}>
                <td>{pest.pestsId}</td>
                <td>{pest.pestsName}</td>
                <td>{pest.pestsDescription}</td>
                <td>{pest.suppliesId}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        pest.pestsId,
                        pest.pestsName,
                        pest.pestsDescription,
                        pest.suppliesId
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(pest.pestsId)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h2>PLAGAS MAS COMUNES QUE PUEDEN EXISTIR EN TU CULTIVO</h2>
      <br />
      <CartsPlagas></CartsPlagas>
    </div>
  );
}

export default Pests;
