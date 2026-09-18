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
          © {new Date().getFullYear()}{" "}
          Hound Express
        </span>

        <a
          href="#contenido-principal"
          aria-label="Volver al inicio del contenido principal"
        >
          Volver al inicio
        </a>
      </div>
    </footer>
  );
}

export default Footer;