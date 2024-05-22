const API_URL = "https://www.papalandiagame.somee.com/api/Plots";

export const fetchPlots = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createPlot = async (plotsSize, longitude, latitude) => {
  const response = await fetch(
    `${API_URL}?PlotsSize=${encodeURIComponent(
      plotsSize
    )}&Longitude=${encodeURIComponent(longitude)}&Latitude=${encodeURIComponent(
      latitude
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const updatePlot = async (plotsId, plotsSize, longitude, latitude) => {
  const response = await fetch(
    `${API_URL}/${plotsId}?PlotsSize=${encodeURIComponent(
      plotsSize
    )}&Longitude=${encodeURIComponent(longitude)}&Latitude=${encodeURIComponent(
      latitude
    )}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deletePlot = async (plotsId) => {
  await fetch(`${API_URL}/${plotsId}`, {
    method: "DELETE",
  });
};
