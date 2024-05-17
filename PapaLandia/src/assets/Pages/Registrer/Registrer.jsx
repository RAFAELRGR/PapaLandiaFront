import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registrer.Module.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const userRolId = 1;
    const { username, email, password } = formData;
    const url = `https://www.papalandiagame.somee.com/api/Users/Create?userName=${username}&email=${email}&password=${password}&userRolId=${userRolId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data?.status != 400) {
        console.log(data);
        alert("Registro exitoso!");
        navigate("/login");
      } else {
        alert("Llena todos los Campos");
      }
    } catch (error) {
      alert("Ocurrió un error al registrar. Inténtalo de nuevo.");
      console.error("Error:", error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Register w-full lg:w-2/3 flex items-center justify-center bg-white">
      <div className="FormularioRegister w-full max-w-md m-auto rounded-lg border border-zinc-300 shadow-md py-10 px-16">
        <h1 className="text-2xl font-medium text-zinc-800 mt-4 mb-12 text-center">
          REGISTRO DE USUARIO
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-left">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="username"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-left">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="email"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-left">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 pr-10"
              id="password"
              placeholder="Ingresa tu contraseña"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
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
            REGISTRARSE
          </button>
          {error && <div className="error text-red-600 mt-4">{error}</div>}

          <div className="text-center mt-6">
            <a href="#" className="text-blue-600" onClick={handleRegisterClick}>
              ¿Ya tienes una cuenta? Iniciar sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
