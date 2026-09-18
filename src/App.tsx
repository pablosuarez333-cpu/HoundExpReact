import Header from "./components/Header";
import Banner from "./components/Banner";
import RegisterForm from "./components/RegisterForm";
import StatusPanel from "./components/StatusPanel";
import GuideList from "./components/GuideList";
import History from "./components/History";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <a
        href="#contenido-principal"
        className="skip-link"
      >
        Saltar al contenido principal
      </a>

      <Header />

      <main
        id="contenido-principal"
        tabIndex={-1}
      >
        <Banner />

        <RegisterForm />

        <StatusPanel />

        <GuideList />

        <History />
      </main>

      <Footer />
    </div>
  );
}

export default App;