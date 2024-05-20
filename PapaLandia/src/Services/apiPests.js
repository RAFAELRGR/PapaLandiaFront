const API_URL = "https://www.papalandiagame.somee.com/api/Pests";

export const fetchPests = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createPest = async (pestsName, pestsDescription, suppliesId) => {
  const response = await fetch(
    `${API_URL}?PestsName=${encodeURIComponent(
      pestsName
    )}&PestsDescription=${encodeURIComponent(
      pestsDescription
    )}&SuppliesId=${suppliesId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const updatePest = async (
  pestsId,
  pestsName,
  pestsDescription,
  suppliesId
) => {
  const response = await fetch(
    `${API_URL}/${pestsId}?PestsName=${encodeURIComponent(
      pestsName
    )}&PestsDescription=${encodeURIComponent(
      pestsDescription
    )}&SuppliesId=${suppliesId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deletePest = async (pestsId) => {
  await fetch(`${API_URL}/${pestsId}`, {
    method: "DELETE",
  });
};
