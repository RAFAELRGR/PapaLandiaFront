const API_URL_ACHIEVEMENTS =
  "https://www.papalandiagame.somee.com/api/Achievements";
const API_URL_GAMES_ACHIEVEMENTS =
  "https://www.papalandiagame.somee.com/api/GamesAchievements";

export const fetchLogros = async () => {
  const response = await fetch(API_URL_ACHIEVEMENTS);
  if (!response.ok) {
    throw new Error("Error al obtener los logros");
  }
  return response.json();
};

export const fetchGamesAchievements = async () => {
  const response = await fetch(API_URL_GAMES_ACHIEVEMENTS);
  if (!response.ok) {
    throw new Error("Error al obtener los logros de juegos");
  }
  return response.json();
};
