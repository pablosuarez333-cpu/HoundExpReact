

function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <strong>
          Hound Express
        </strong>

        <p>
          Sistema de Gestión de Guías
        </p>
      </div>

      <div className="footer-links">
        <span>
          © {new Date().getFullYear()}
        </span>

        <a href="#registro">
          Volver a Inicio
        </a>
      </div>
    </footer>
  );
}

export default Footer;