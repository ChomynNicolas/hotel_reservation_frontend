import { Link, useNavigate } from "react-router-dom";
import { NavLinks } from "./components/NavLinks";
import { IoLogInOutline } from "react-icons/io5";
import { PiUserCircleGearBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaUserAlt } from "react-icons/fa";

const navItems = [
  {
    title: "Habitaciones",
    url: "/rooms",
    roles: ["guest", "admin", undefined],
  },
  {
    title: "Mis reservaciones",
    url: "/user/reservations",
    roles: ["guest", "admin"],
  },
  { title: "Habitaciones Admin", url: "/admin/rooms", roles: ["admin"] },
  { title: "Reservaciones", url: "/admin/reservations", roles: ["admin"] },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.role.role);
  const token = localStorage.getItem("accessToken");

  const onCloseSession = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-around py-4 bg-[#3c55ef] backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"} className="cursor-pointer">
            <h3 className="text-2xl font-medium text-blue-500">
              <img
                className="h-10 lg:h-24 object-cover  "
                src="/hotel_logo.png"
                alt="Store Logo"
              />
            </h3>
          </Link>
        </div>

        {/* Sección de Links */}
        <div className="items-center space-x-8 flex">
          {navItems
            .filter((item) => item.roles.includes(role!))
            .map((item) => (
              <NavLinks key={item.title} title={item.title} url={item.url} />
            ))}
        </div>

        {/* Sección de Iconos y Registro/Login */}
        <div className="flex items-center justify-end  space-x-5">
          {!(token !== null && !(role === undefined)) ? (
            <>
              <Link
                to={"/register"}
                className="flex text-xs lg:text-base text-gray-300 items-center hover:text-[#efd63c] cursor-pointer hover:underline  transition-colors duration-300"
              >
                <PiUserCircleGearBold size={25} className="mx-1" />
                Registrarse
              </Link>

              <Link
                to={"/login"}
                className="flex text-xs lg:text-base text-gray-300 items-center hover:text-[#efd63c] cursor-pointer hover:underline  transition-colors duration-300"
              >
                <IoLogInOutline size={25} className="mx-1" />
                Iniciar Sesión
              </Link>
            </>
          ) : (
            <>
              <FaUserAlt size={30} />
              <button
                onClick={onCloseSession}
                className="text-xs lg:text-base font-medium text-[#efd63c] dark:text-[#efd63c] hover:underline cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
