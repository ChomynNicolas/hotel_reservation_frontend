import { Link } from "react-router-dom";
import { NavLinks } from "./components/NavLinks";
import { IoLogInOutline } from "react-icons/io5";
import { PiUserCircleGearBold } from "react-icons/pi";


interface NavItems{
  title:string,
  url:string
}

const navItems:NavItems[] = [
  { title: "Habitaciones", url: "/rooms" },
  { title: "Mis reservaciones", url: "/user/reservations" },
  { title: "Consultar Disponibilidad", url: "/disponibility" },
  { title: "Usuarios", url: "/admin/users" },
  { title: "Reservaciones", url: "/admin/reservations" },
  {title:"Sobre nosotros",url:"/"}
];

export const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
          to={'/'}
          className="cursor-pointer">
            <h3 className="text-2xl font-medium text-blue-500">
              <img
                className="h-24 object-cover"
                src="/hotel_logo.png"
                alt="Store Logo"
              />
            </h3>
          </Link>
        </div>

        {/* Sección de Links */}
        <div className="items-center hidden space-x-8 lg:flex">
          {navItems.map(item =>(
            <NavLinks key={item.title} title={item.title} url={item.url} />
          ))}
        </div>

        {/* Sección de Iconos y Registro/Login */}
        <div className="flex items-center  space-x-5">
          <a className="flex text-gray-600 items-center hover:text-blue-500 cursor-pointer transition-colors duration-300">
          <PiUserCircleGearBold size={30} className="mx-1"/>
            Registrarse
          </a>

          <a className="flex text-gray-600 font-semibold items-center text-blue-600 cursor-pointer transition-colors duration-300">
          <IoLogInOutline size={30} className="mx-1"/>
            Iniciar Sesión
          </a>
        </div>
      </nav>
    </>
  );
};
