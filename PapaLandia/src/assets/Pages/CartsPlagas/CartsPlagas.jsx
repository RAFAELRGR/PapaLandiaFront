function CartsPlagas() {
  return (
    <div className="cart-container">
      <div className="card">
        <img src="/escarabajo.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Escarabajo de la papa</h5>
          <p className="card-text">
            Este insecto es quizás la plaga más reconocible y devastadora para
            los cultivos de papa. Las larvas y adultos se alimentan de las
            hojas, lo que puede defoliar completamente las plantas y reducir
            significativamente el rendimiento del cultivo.
          </p>
        </div>
      </div>
      <br />
      <div className="card">
        <img src="/Nematodo.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Nematodo dorado de la papa</h5>
          <p className="card-text">
            Los nematodos son parásitos del suelo que atacan las raíces de las
            plantas de papa, formando quistes que reducen la capacidad de la
            planta para absorber agua y nutrientes.
          </p>
        </div>
      </div>
      <br />
      <div className="card">
        <img src="/polilla.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Polilla de la papa</h5>
          <p className="card-text">
            Esta plaga afecta las hojas y los tubérculos de la papa. Las larvas
            producen galerías en los tubérculos, lo que reduce la calidad y el
            valor comercial. El control se logra mediante la aplicación de
            insecticidas específicos
          </p>
        </div>
      </div>
      <br />
      <div className="card">
        <img src="/Pulgones.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Pulgones</h5>
          <p className="card-text">
            Los pulgones son pequeños insectos chupadores que se alimentan de la
            savia de las plantas. Pueden transmitir enfermedades virales y
            debilitar las plantas de papa. El control se puede realizar con
            insecticidas o mediante la introducción de enemigos naturales como
            las mariquitas
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CartsPlagas;
