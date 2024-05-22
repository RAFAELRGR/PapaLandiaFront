const API_URL = "https://www.papalandiagame.somee.com/api/Tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }
  return response.json();
};

export const createTask = async (
  cropsId,
  description,
  dateTask,
  stateTasksId,
  userId
) => {
  const response = await fetch(
    `${API_URL}?CropsId=${encodeURIComponent(
      cropsId
    )}&Description=${encodeURIComponent(
      description
    )}&DateTask=${encodeURIComponent(
      dateTask
    )}&StateTasksId=${encodeURIComponent(
      stateTasksId
    )}&UserId=${encodeURIComponent(userId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear la tarea");
  }

  // Return a simple message or status instead of JSON
  return { message: "Tarea creada exitosamente!" };
};

export const updateTask = async (
  tasksId,
  cropsId,
  description,
  dateTask,
  stateTasksId,
  userId
) => {
  const response = await fetch(
    `${API_URL}/${tasksId}?CropsId=${encodeURIComponent(
      cropsId
    )}&Description=${encodeURIComponent(
      description
    )}&DateTask=${encodeURIComponent(
      dateTask
    )}&StateTasksId=${encodeURIComponent(
      stateTasksId
    )}&UserId=${encodeURIComponent(userId)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la tarea");
  }

  // Return a simple message or status instead of JSON
  return { message: "Tarea actualizada exitosamente!" };
};

export const deleteTask = async (tasksId) => {
  const response = await fetch(`${API_URL}/${tasksId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar la tarea");
  }

  // Return a simple message or status instead of JSON
  return { message: "Tarea eliminada exitosamente!" };
};
