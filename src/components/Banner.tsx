

import trackingDog from "../assets/img/perro-hound-express-rastreando.png";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-text">
        <h2>
          Gestión y seguimiento
          de guías
        </h2>

        <p>
          Administra el registro y estado
          de tus envíos de forma sencilla.
        </p>
      </div>

      <div className="banner-image">
        <img
          src={trackingDog}
          alt="Perro Hound Express rastreando un envío"
        />
      </div>
    </section>
  );
}

export default Banner;