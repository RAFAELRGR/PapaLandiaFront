import "./Carrusel.Module.css";

function Carrusel() {
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src="/carrusel.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5 className="Description">INGRESA A TU PROPIO CULTIVO</h5>
            <p className="Description">Administra tus cultivos desde aqui.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src="/Papas.jpeg" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>MANEJA TAREAS DE TU CULTIVO</h5>
            <p>En este lugar podras administrar tus tareas.</p>
          </div>
        </div>
        <div className="carousel-item">
          <a
            href="https://viejorafa.itch.io/papalandia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/Juego.png" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>PapaLandia Game</h5>
              <p>¡Juega nuestro juego ahora mismo!</p>
            </div>
          </a>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carrusel;
