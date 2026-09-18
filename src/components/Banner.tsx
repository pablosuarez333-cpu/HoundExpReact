import trackingDog from "../assets/img/perro-hound-express-rastreando.png";

function Banner() {
  return (
    <section
      className="banner"
      aria-labelledby="banner-title"
    >
      <div className="banner-text">
        <h2 id="banner-title">
          Gestión y seguimiento de guías
        </h2>

        <p>
          Administra el registro y estado
          de tus envíos de forma sencilla.
        </p>
      </div>

      <div className="banner-image">
        <img
          src={trackingDog}
          alt="Perro de Hound Express rastreando una guía de envío"
        />
      </div>
    </section>
  );
}

export default Banner;