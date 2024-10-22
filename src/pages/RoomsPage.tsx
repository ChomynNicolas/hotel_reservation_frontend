import axios from "axios";
import { useEffect } from "react";
import { RoomList } from "../components/roomList/RoomList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRooms } from "@/redux/roomsSlice";

export interface Rooms {
  id: string;
  number: string;
  type: string;
  price: string;
}

export const RoomsPage = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  useEffect(() => {
    
    if(!rooms || rooms.length === 0){
      axios
        .get<Rooms[]>("http://127.0.0.1:5000/api/rooms")
        .then((response) => dispatch(setRooms(response.data)))
        .catch((error) => console.log(error));
    }
  }, [dispatch,rooms]);

  return (
    <>
      
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Numero
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Reservar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.length < 1 ? (
              <>
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
              </>
            ) : (
              rooms.map((rooms, index) => <RoomList {...rooms} key={index} />)
            )}
          </tbody>
        </table>
      
    </>
  );
};
