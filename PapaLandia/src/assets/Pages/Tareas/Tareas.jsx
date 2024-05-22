import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
} from "../../../Services/apiTareas";
import "./Tareas.Module.css";
import NarBar from "../NarBar/NarBar";

function Tareas() {
  const [cropsId, setCropsId] = useState("");
  const [description, setDescription] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [stateTasksId, setStateTasksId] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!cropsId || !description || !dateTask || !stateTasksId || !userId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (updateMode) {
        const response = await updateTask(
          updateId,
          cropsId,
          description,
          dateTask,
          stateTasksId,
          userId
        );
        console.log("Respuesta al actualizar tarea:", response.message);
        setUpdateMode(false);
        setUpdateId(null);
        alert(response.message);
        navigate("/tareas");
      } else {
        const response = await createTask(
          cropsId,
          description,
          dateTask,
          stateTasksId,
          userId
        );
        console.log("Respuesta al crear tarea:", response.message);
        alert(response.message);
      }

      setCropsId("");
      setDescription("");
      setDateTask("");
      setStateTasksId("");
      setUserId("");

      obtenerTareas();
    } catch (error) {
      console.error("Error al procesar la tarea:", error);
      setError("Ocurrió un error al procesar la tarea. Inténtalo de nuevo.");
    }
  };

  const handleShowComponent = () => {
    setIsVisible(true);
  };

  const handleCloseComponent = () => {
    setIsVisible(false);
    setUpdateMode(false);
    setUpdateId(null);
    setCropsId("");
    setDescription("");
    setDateTask("");
    setStateTasksId("");
    setUserId("");
  };

  const handleUpdate = (
    id,
    cropsId,
    description,
    dateTask,
    stateTasksId,
    userId
  ) => {
    setUpdateMode(true);
    setUpdateId(id);
    setCropsId(cropsId);
    setDescription(description);
    setDateTask(dateTask);
    setStateTasksId(stateTasksId);
    setUserId(userId);
    setIsVisible(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteTask(id);
        console.log("Respuesta al eliminar tarea:", response.message);
        alert(response.message);
        obtenerTareas();
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        setError("Ocurrió un error al eliminar la tarea. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="FondoTareas">
      <NarBar className="barra-navegacion" />
      <div className="green-container">
        {!isVisible && (
          <button onClick={handleShowComponent}>Agregar Tarea</button>
        )}
        {isVisible && (
          <div className="Tareas">
            <button onClick={handleCloseComponent}>Cerrar formulario</button>
            <h2>{updateMode ? "Actualizar Tarea" : "Crear Nueva Tarea"}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cropsId">ID del Cultivo:</label>
                <input
                  type="text"
                  id="cropsId"
                  value={cropsId}
                  onChange={(e) => setCropsId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Descripción:</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dateTask">Fecha de la Tarea:</label>
                <input
                  type="date"
                  id="dateTask"
                  value={dateTask}
                  onChange={(e) => setDateTask(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="stateTasksId">ID del Estado de la Tarea:</label>
                <input
                  type="text"
                  id="stateTasksId"
                  value={stateTasksId}
                  onChange={(e) => setStateTasksId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="userId">ID del Usuario:</label>
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <button type="submit">
                {updateMode ? "Actualizar" : "Crear"} Tarea
              </button>
            </form>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="tabla-container">
        <h2>Tareas</h2>
        <br />
        <button onClick={obtenerTareas}>Actualizar tabla</button>
        <table className="tabla-tareas">
          <thead>
            <tr>
              <th>ID de la Tarea</th>
              <th>ID del Cultivo</th>
              <th>Descripción</th>
              <th>Fecha de la Tarea</th>
              <th>ID del Estado de la Tarea</th>
              <th>ID del Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((tarea) => (
              <tr key={tarea.tasksId}>
                <td>{tarea.tasksId}</td>
                <td>{tarea.cropsId}</td>
                <td>{tarea.description}</td>
                <td>{tarea.dateTask}</td>
                <td>{tarea.stateTasksId}</td>
                <td>{tarea.userId}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdate(
                        tarea.tasksId,
                        tarea.cropsId,
                        tarea.description,
                        tarea.dateTask,
                        tarea.stateTasksId,
                        tarea.userId
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button onClick={() => handleDelete(tarea.tasksId)}>
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

export default Tareas;
