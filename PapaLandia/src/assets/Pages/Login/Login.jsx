import { useState } from "react";
import "./Login.Module.css";

function Login() {
  const [showpassword, setShowpassword] = useState(false);
  const ChangeButton = () => {
    setShowpassword(!showpassword);
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
        <form>
          <div>
            <label htmlFor="email" className="text-left">
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-2 text-zinc-800 border border-zinc-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="email"
              placeholder="Ingresa tu e-mail"
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
            />
            <button
              type="button"
              onClick={ChangeButton}
              id="togglePassword"
              className="absolute inset-y-0 right-0 flex items-center px-2"
            >
              <i className="bi bi-eye-fill"></i>
            </button>
            <br />
            <a href="#" className="text-sm text-blue-600 hover:underline mb-6">
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="Boton w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            INICIAR SESIÓN
          </button>

          <div className="text-center mt-6">
            <a href="#" className="text-blue-600">
              ¿Todavía no tienes una cuenta? Crear una ahora
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
