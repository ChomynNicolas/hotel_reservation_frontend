import axios from "axios";
import clsx from "clsx";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Props {
  id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  type?: string;
  room_number?: string;
  handleCancelReservation: (id: string) => void;
}

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str; // Si la cadena está vacía, retornarla tal cual
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const UserReservationsList = ({
  id,
  room_number,
  check_in_date,
  check_out_date,
  type,
  status,
  handleCancelReservation,
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

  const handleCancel = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://127.0.0.1:5000/api/bookings/${id}/cancel`,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            Swal.fire({
              title: "Cancelada",
              text: "Tu reservación ha sido cancelada.",
              icon: "success",
            }).then(() => {
              handleCancelReservation(id);
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

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
        {type}
      </th>
      <td className="px-6 py-4">{room_number}</td>
      <td className="px-2 py-4">
        14:00 hs, {capitalizeFirstLetter(checkInDateFormateada)}
      </td>
      <td className="px-2 py-4">
        10:00 hs, {capitalizeFirstLetter(checkOutDateFormateada)}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          disabled={status === "canceled"}
          onClick={handleCancel}
          className={clsx(
            "font-medium",
            status === "canceled"
              ? "bg-red-100"
              : "text-blue-600 dark:text-blue-500 hover:underline"
          )}
        >
          {status === "canceled" ? "Cancelado" : "Cancelar"}
        </button>
      </td>
    </tr>
  );
};
