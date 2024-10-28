import axios from "axios";
import { useEffect } from "react";
import { RoomList } from "../components/roomList/RoomList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setRooms } from "@/redux/roomsSlice";
import { fetchUserRole } from "@/redux/fetchUserRole";

export interface Rooms {
  id: string;
  number: string;
  type: string;
  price: string;
  status?: string;
}

export const RoomsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  
    dispatch(fetchUserRole());
  }, [dispatch]);


  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      axios
        .get<Rooms[]>("http://127.0.0.1:5000/api/rooms")
        .then((response) => {
          
          const sortedRooms = response.data.sort((a, b) => {
            return parseInt(a.number) - parseInt(b.number);
          });
          const filterRooms = sortedRooms.filter((room) =>room.status === "available")
          dispatch(setRooms(filterRooms));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, rooms]);

  return (
    <div className="flex flex-col items-center justify-center mt-32 mx-8 xl:mx-60 ">
      
      <h3 className="text-3xl font-bold my-2">Habitaciones</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
          <thead className="text-xs text-gray-50 uppercase bg-[#0c0a29]">
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
              rooms.map((rooms, index) => <RoomList {...rooms} key={index} isAdmin={false} />)
            )}
          </tbody>
        </table>
      
    </div>
  );
};
