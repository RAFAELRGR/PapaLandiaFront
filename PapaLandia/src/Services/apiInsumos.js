const API_URL = "https://www.papalandiagame.somee.com/api/Supplies";

export const fetchInsumos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchInsumo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createInsumo = async (
  suppliesName,
  suppliesDescription,
  typeSuppliesId
) => {
  const url = new URL(API_URL);
  url.searchParams.append("suppliesName", suppliesName);
  url.searchParams.append("suppliesDescription", suppliesDescription);
  url.searchParams.append("typeSuppliesId", typeSuppliesId);

  const response = await fetch(url, {
    method: "POST",
  });
  return response.json();
};

export const updateInsumo = async (
  suppliesId,
  suppliesName,
  suppliesDescription,
  typeSuppliesId
) => {
  const url = `${API_URL}/${suppliesId}`;
  const params = new URLSearchParams();
  params.append("suppliesName", suppliesName);
  params.append("suppliesDescription", suppliesDescription);
  params.append("typeSuppliesId", typeSuppliesId);

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "PUT",
  });

  return response;
};

export const deleteInsumo = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
