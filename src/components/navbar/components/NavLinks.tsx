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
          ? "flex text-blue-500 cursor-pointer transition-colors duration-300" // Clases para el link activo
          : "flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300" // Clases para el link inactivo
      }
    >
      {title}
    </NavLink>
  );
};
