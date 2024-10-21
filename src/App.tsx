
import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import { HomePage } from "./pages/HomePage";
import { UserLogin } from "./pages/UserLogin";
import { UserRegister } from "./pages/UserRegister";
import { useEffect, useState } from "react";
import { NavBar } from "./components/navbar/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import ReservationPage from "./pages/ReservationPage";

function App() {
  
  const [percent, setPercent] = useState(0);

  // Función para actualizar el progreso de scroll
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setPercent(scrollPercent);
  };

  // Efecto para registrar el evento de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center mt-32">
      <div className="flex flex-col">
        {/* Progreso de desplazamiento */}
        <div
          className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500"
          style={{ width: `${percent}%` }}
        ></div>

        {/* nav bar */}
        <NavBar/>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path="/reservation/:id" element={<ReservationPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
