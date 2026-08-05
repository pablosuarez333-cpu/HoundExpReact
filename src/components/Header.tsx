function Header() {
  return (
    <header className="app-header" id="inicio">
      <div className="logo-container">
        <img
          src="/src/assets/img/logoAzulBlancoHE.png"
          alt="Hound Express"
          className="logo"
        />

        <h1 className="app-title">Seguimiento de Paquetes</h1>
      </div>

      <nav className="main-nav">
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#registro">Registro de Guías</a></li>
          <li><a href="#estado-general">Estado General</a></li>
          <li><a href="#lista-guias">Lista de Guías</a></li>
          <li><a href="#historial">Historial</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;