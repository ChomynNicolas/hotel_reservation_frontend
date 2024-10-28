import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  url: string;
}

export const NavLinks = ({ title, url }: Props) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive
          ? "flex lg:text-lg text-[#efd63c] cursor-pointer transition-colors duration-300 " // Clases para el link activo
          : "flex lg:text-lg text-gray-300 hover:text-[#efd63c] cursor-pointer transition-colors duration-300" // Clases para el link inactivo
      }
    >
      {title}
    </NavLink>
  );
};
