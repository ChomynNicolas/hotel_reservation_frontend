import axios from "axios";
import clsx from "clsx";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { BsFillHousesFill } from "react-icons/bs";
import { FaHouseChimney } from "react-icons/fa6";
import { GiBlockHouse } from "react-icons/gi";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  type: string;
  number: string;
  price: string;
  isAdmin: boolean;
  status?:string;
  setEditRoom?: (room: {
    id: string;
    type: string;
    number: string;
    price: string;
  }) => void; // Hacemos que setEditRoom sea opcional
  selectedRoomId?: string | null; // El id de la habitación seleccionada
  setSelectedRoomId?: (id: string) => void;
  setEditing?: (editing: boolean) => void;
  updateRoomStatus:(id:string,newStatus:string)=> void;
}

const roomImage = {
  Estándar: <FaHouseChimney size={20} />,
  Deluxe: <BsFillHousesFill size={20} />,
  Suite: <BiSolidBuildingHouse size={20} />,
  Penthouse: <GiBlockHouse size={20} />,
};

export const RoomList = ({
  number,
  price,
  type,
  id,
  isAdmin,
  setEditRoom,
  selectedRoomId,
  setSelectedRoomId,
  setEditing,
  status, 
  updateRoomStatus
}: Props) => {
  // Función para eliminar la habitación
  const handleDelete = () => {
    const newStatus = status === "available" ? "unavailable" : "available"; // Cambia el estado
    const data = {
      number,
      type,
      price,
      status: newStatus,
    };
    axios
      .put(`http://127.0.0.1:5000/api/rooms/${id}/update`, data)
      .then(() => {
        // Actualizar el estado de la habitación en el componente padre
        if (updateRoomStatus) {
          updateRoomStatus(id, newStatus);
        }
      })
      .catch((error) => console.error("Error al actualizar la habitación", error));
  };

  const handleEdit = () => {
    if (setEditRoom) {
      setEditRoom({ id, type, number, price });
      setSelectedRoomId!(id);
      setEditing!(true);
    }
  };

  return (
    <tr
      className={clsx(
        "border-b dark:bg-gray-800 dark:border-gray-700",
        selectedRoomId === id
          ? "bg-green-200"
          : "bg-white hover:bg-gray-50 dark:hover:bg-gray-600"
      )}
    >
      <th
        scope="row"
        className="flex items-center gap-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {roomImage[type]} {type}
      </th>
      <td className="px-6 py-4">{number}</td>
      <td className="px-6 py-4">{price}</td>
      {isAdmin ? (
        <>
          <td className="px-6 py-4 text-right">
            <button
              className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
              onClick={handleEdit}
            >
              Editar
            </button>
          </td>
          <td className="px-6 py-4 text-right">
            <button
              className={clsx(
                "font-medium  hover:underline",
                status==="available"?"text-red-500 dark:text-red-400":"text-green-500 dark:text-green-400"
              )}
              onClick={handleDelete}
            >
              {status==="available"?"Deshabilitar":"Habilitar"}
            </button>
          </td>
        </>
      ) : (
        <td className="px-6 py-4 text-right">
          <Link
            to={`/reservation/${id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Reservar
          </Link>
        </td>
      )}
    </tr>
  );
};
