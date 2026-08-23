// src/App.tsx

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
      <Header />

      <main>
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