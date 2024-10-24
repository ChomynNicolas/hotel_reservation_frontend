import axios from "axios";
import { useEffect, useState } from "react";
import { RoomList } from "../components/roomList/RoomList";
import useAuthRole from "@/components/hooks/useAuthRole";

export interface Rooms {
  id: string;
  number: string;
  type: string;
  price: string;
  status?:string;
}

export const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState<Rooms[]>([]);

  const [editRoom, setEditRoom] = useState<Rooms | null>(null); // Estado para manejar la habitación en edición
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useAuthRole();

  useEffect(() => {
    axios
      .get<Rooms[]>("http://127.0.0.1:5000/api/rooms")
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(rooms)

  // Función para manejar el envío del formulario de edición
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editRoom) {
      if (editing) {
        axios
          .put(
            `http://127.0.0.1:5000/api/rooms/${editRoom.id}/update`,
            editRoom
          )
          .then((response) => {
            setRooms(
              rooms.map((room) =>
                room.id === editRoom.id ? response.data : room
              )
            );
            setEditRoom(null); // Limpiar el formulario después de editar
            setSelectedRoomId(null);
          })
          .catch((error) => console.log(error));
      } else {
        // Si estamos creando una nueva habitación
        axios
          .post(`http://127.0.0.1:5000/api/rooms`, editRoom)
          .then((response) => {
            setRooms([...rooms, response.data]); 
            setEditRoom(null); 
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const updateRoomStatus = (id: string, newStatus: string) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  const onResetForm = () => {
    setEditRoom(null);
    setSelectedRoomId(null);
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 mx-8 xl:mx-60">
      {/* Formulario de edición */}
      <form onSubmit={handleEditSubmit} className="mb-4">
        <h2 className="text-lg font-bold mb-2">Formulario Habitación</h2>
        <div className="flex items-center justify-center grid-cols-3 gap-4">
          {/* Cambiamos el input de texto por un select */}
          <select
            value={editRoom?.type || ""}
            onChange={(e) =>
              setEditRoom({ ...editRoom, type: e.target.value } as Rooms)
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Selecciona el tipo
            </option>
            <option value="Estándar">Estándar</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Penthouse">Penthouse</option>
          </select>

          <input
            type="text"
            placeholder="Número"
            value={editRoom?.number || ""}
            onChange={(e) =>
              setEditRoom({ ...editRoom, number: e.target.value } as Rooms)
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Precio"
            value={editRoom?.price || ""}
            onChange={(e) =>
              setEditRoom({ ...editRoom, price: e.target.value } as Rooms)
            }
            className="p-2 border border-gray-300 rounded"
          />
          <button type="submit" className=" bg-blue-500 text-white p-2 rounded">
            {editing ? "Guardar Cambios" : "Crear Habitación"}
          </button>
          <button
            type="button"
            onClick={onResetForm}
            className=" bg-blue-500 text-white p-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3">
              Número
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.length < 1 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                No
              </th>
              <td className="px-6 py-4">Hay</td>
              <td className="px-6 py-4">Habitaciones</td>
              <td className="px-6 py-4 text-right"></td>
            </tr>
          ) : (
            rooms.map((room, index) => (
              <RoomList
                {...room}
                key={index}
                isAdmin={true}
                setEditRoom={setEditRoom} // Pasamos la función para manejar la edición
                selectedRoomId={selectedRoomId} // Pasamos el id de la habitación seleccionada
                setSelectedRoomId={setSelectedRoomId}
                setEditing={setEditing}
                updateRoomStatus={updateRoomStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
