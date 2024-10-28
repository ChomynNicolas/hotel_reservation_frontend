
import clsx from "clsx";

interface Props {
  id: string;
  name: string;
  email: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str; // Si la cadena está vacía, retornarla tal cual
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const AdminUserReservationList = ({
  
  name,
  check_in_date,
  check_out_date,
  email,
  status,
}: Props) => {
  const checkInDate = new Date(check_in_date);
  const checkOutDate = new Date(check_out_date);

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const checkInDateFormateada = checkInDate.toLocaleDateString(
    "es-ES",
    opciones
  );
  const checkOutDateFormateada = checkOutDate.toLocaleDateString(
    "es-ES",
    opciones
  );

  


  return (
    <tr
      className={clsx(
        " border-b dark:bg-gray-800 dark:border-gray-700  ",
        status === "canceled"
          ? "bg-red-100"
          : "dark:hover:bg-gray-600 hover:bg-gray-50"
      )}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-2 py-4">
        14:00 hs, {capitalizeFirstLetter(checkInDateFormateada)}
      </td>
      <td className="px-2 py-4">
        10:00 hs, {capitalizeFirstLetter(checkOutDateFormateada)}
      </td>
      <td className={clsx(
            "font-medium",
            status === "canceled"
              ? "bg-red-100"
              : "text-blue-600 dark:text-blue-500 "
          )}>
        {status === "reserved" ?"Reservado":"Cancelada"}
      </td>
    </tr>
  );
};
