import Cookies from "universal-cookie";

import { NavLink } from "react-router-dom";
const cookies = new Cookies();
function NarBar() {
  const handleLogout = () => {
    cookies.remove("userloged");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="https://viejorafa.itch.io/papalandia">
          PapaLandia
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" activeClassName="active" exact to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/About">
              Acerca De
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/insumos"
            >
              Inventario
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/plagas">
              Plagas
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/papas">
              Papas
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/logros">
              Logros
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/tareas">
              Tareas
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/parcelas"
            >
              Parcelas
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/cultivos"
            >
              Cultivos
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            <button className="nav-link btn btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NarBar;
