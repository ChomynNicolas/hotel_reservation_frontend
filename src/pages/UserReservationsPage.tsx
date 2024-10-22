import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface UserReservations{
  id: string;
  room_id:string;
  checkIn: string;
  checkOut: string;

}

export const UserReservationsPage = () => {
  const [userReservations, setUserReservations] = useState<UserReservations[]>([])

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get<UserReservations[]>("http://127.0.0.1:5000/api/bookings/user",{headers:{
      Authorization: "Bearer " + token
    }}).then(response => setUserReservations(response.data))
    .catch(error => console.log('Ocurrio un error',error))
  
    
  }, [])
  

  console.log(userReservations)


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
              Entrada
            </th>
            <th scope="col" className="px-6 py-3">
              Salida
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Cancelar</span>
            </th>
          </tr>
        </thead>
        <tbody>
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
              <td className="px-6 py-4">Habitaciones</td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/reservation/`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Cancelar
                </Link>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </>
  );
};
