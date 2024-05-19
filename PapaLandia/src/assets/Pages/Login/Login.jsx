import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.Module.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
  const [showpassword, setShowpassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ChangeButton = () => {
    setShowpassword(!showpassword);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const url = `https://www.papalandiagame.somee.com/api/Users/Login?userName=${username}&password=${password}`;

    if (username != null && password != null) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (typeof data == "boolean" && data == true) {
          console.log(data);
          cookies.set("userloged", true);
          alert("Login exitoso!");
          navigate("/"); // Redirige a la ruta de inicio
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Ocurrió un error. Inténtalo de nuevo.");
      }
    } else {
      alert("Rellena los campos requeridos");
    }
  };

  const rootElement = document.getElementById("root");

  if (rootElement) {
    rootElement.style.margin = 0;
    rootElement.style.padding = 0;
    rootElement.style.width = "100%";
    rootElement.style.height = "100vh";
  }

  return (
    <div className="Login w-full lg:w-2/3 flex items-center justify-center bg-white">
      <div className="Formulario w-full max-w-md m-auto rounded-lg border border-zinc-300 shadow-md py-10 px-16">
        <h1 className="text-2xl font-medium text-zinc-800 mt-4 mb-12 text-center">
          BIENVENIDO USUARIO
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text" className="text-left">
              E-mail
            </label>
            <input
              type="text"
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="text"
              placeholder="Ingresa tu e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-left">
              Contraseña
            </label>
            <input
              type={showpassword ? "text" : "password"}
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 pr-10"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={ChangeButton}
              id="togglePassword"
              className="absolute inset-y-0 right-0 flex items-center px-2"
            >
              <i className="bi bi-eye-fill"></i>
            </button>
          </div>

          <button
            type="submit"
            className="Boton w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            INICIAR SESIÓN
          </button>
          {error && <div className="error text-red-600 mt-4">{error}</div>}

          <div className="text-center mt-6">
            <a href="#" className="text-blue-600" onClick={handleRegisterClick}>
              ¿Todavía no tienes una cuenta? Crear una ahora
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
