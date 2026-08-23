

import logo from "../assets/img/logo-Hound_Express-bg-white.png";

function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img
          className="logo"
          src={logo}
          alt="Hound Express"
        />

        <h1 className="app-title">
          Sistema de Gestión de Guías
        </h1>
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <a href="#registro">
              Registrar guía
            </a>
          </li>

          <li>
            <a href="#estado">
              Estado general
            </a>
          </li>

          <li>
            <a href="#guias">
              Guías
            </a>
          </li>

          <li>
            <a href="#historial">
              Historial
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;