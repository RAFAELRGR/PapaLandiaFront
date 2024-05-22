const API_URL = "https://www.papalandiagame.somee.com/api/Crops";

export const fetchCrops = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los cultivos");
  }
  return response.json();
};

export const createCrop = async (
  plotsId,
  potatoesId,
  pestId,
  sowingDate,
  stateCropsId
) => {
  const response = await fetch(
    `${API_URL}?PlotsId=${encodeURIComponent(
      plotsId
    )}&PotatoesId=${encodeURIComponent(potatoesId)}&PestId=${encodeURIComponent(
      pestId
    )}&SowingDate=${encodeURIComponent(
      sowingDate
    )}&StateCropsId=${encodeURIComponent(stateCropsId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el cultivo");
  }

  return { message: "Cultivo creado exitosamente!" };
};

export const updateCrop = async (
  cropsId,
  plotsId,
  potatoesId,
  pestId,
  sowingDate,
  stateCropsId
) => {
  const response = await fetch(
    `${API_URL}/${cropsId}?PlotsId=${encodeURIComponent(
      plotsId
    )}&PotatoesId=${encodeURIComponent(potatoesId)}&PestId=${encodeURIComponent(
      pestId
    )}&SowingDate=${encodeURIComponent(
      sowingDate
    )}&StateCropsId=${encodeURIComponent(stateCropsId)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el cultivo");
  }

  return { message: "Cultivo actualizado exitosamente!" };
};

export const deleteCrop = async (cropsId) => {
  const response = await fetch(`${API_URL}/${cropsId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el cultivo");
  }
  return { message: "Cultivo eliminado exitosamente!" };
};
