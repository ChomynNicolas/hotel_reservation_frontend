import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { UserLogin } from "./pages/UserLogin";
import { UserRegister } from "./pages/UserRegister";
import { NavBar } from "./components/navbar/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import ReservationPage from "./pages/ReservationPage";
import { UserReservationsPage } from "./pages/UserReservationsPage";
import { AdminRoomsPage } from "./pages/AdminRoomsPage";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";


function AppLayout() {

  

  const location = useLocation();

  // Rutas donde no se muestra el NavBar
  const hideNavBarPaths = ["/login", "/register"];

  const shouldShowNavBar = !hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {/* Mostrar el NavBar solo si no está en las rutas de login o register */}
      {shouldShowNavBar && (
        <div className="flex flex-col">
          <NavBar />
        </div>
      )}

      <Routes>
        {/* Rutas accesibles para todos */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/rooms" element={<RoomsPage />} />

        {/* Rutas protegidas para Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/rooms" element={<AdminRoomsPage />} />
        </Route>

        {/* Rutas protegidas para Usuarios */}
        <Route element={<ProtectedRoute allowedRoles={["guest", "admin"]} />}>
          <Route path="/reservation/:id" element={<ReservationPage />} />
          <Route
            path="/user/reservations"
            element={<UserReservationsPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;