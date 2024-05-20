const API_URL = "https://www.papalandiagame.somee.com/api/Potatoes";

export const fetchPotatoes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createPotato = async (
  potatoesName,
  description,
  timeGrowth,
  typePotatoesId
) => {
  const response = await fetch(
    `${API_URL}?PotatoesName=${encodeURIComponent(
      potatoesName
    )}&Description=${encodeURIComponent(
      description
    )}&TimeGrowth=${timeGrowth}&TypePotatoesId=${typePotatoesId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const updatePotato = async (
  potatoesId,
  potatoesName,
  description,
  timeGrowth,
  typePotatoesId
) => {
  const response = await fetch(
    `${API_URL}/${potatoesId}?PotatoesName=${encodeURIComponent(
      potatoesName
    )}&Description=${encodeURIComponent(
      description
    )}&TimeGrowth=${timeGrowth}&TypePotatoesId=${typePotatoesId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deletePotato = async (potatoesId) => {
  await fetch(`${API_URL}/${potatoesId}`, {
    method: "DELETE",
  });
};
