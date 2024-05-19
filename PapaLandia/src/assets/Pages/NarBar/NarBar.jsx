function NarBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/About">
              Acerca De
            </a>
            <a className="nav-link" href="/insumos">
              Inventario
            </a>
            <a className="nav-link" href="#">
              Plagas
            </a>
            <a className="nav-link" href="#">
              Logros
            </a>
            <a className="nav-link" href="#">
              Tareas
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NarBar;
