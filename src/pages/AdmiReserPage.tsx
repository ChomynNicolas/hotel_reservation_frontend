import { AdminUserReservationList } from "@/components/adminUserReservationsList/AdminUserReservationList";
import useAuthRole from "@/components/hooks/useAuthRole";
import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponseBookings {
  id: string;
  user_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

interface ApiResponseUsers {
  id: string;
  name: string;
  email: string;
}

interface UserBookings {
  id: string;
  name: string;
  email: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

export const AdmiReserPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<UserBookings[]>([]);

  useAuthRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseBookings, responseUsers] = await Promise.all([
          axios.get<ApiResponseBookings[]>(
            "http://127.0.0.1:5000/api/bookings"
          ),
          axios.get<ApiResponseUsers[]>("http://127.0.0.1:5000/api/users"),
        ]);

        const combinedData: UserBookings[] = responseBookings.data.map(
          (booking) => {
            const user = responseUsers.data.find(
              (user) => user.id === booking.user_id
            );

            return {
              id: booking.id,
              name: user ? user.name : "Usuario no encontrado",
              email: user ? user.email : "Email no disponible",
              check_in_date: booking.check_in_date,
              check_out_date: booking.check_out_date,
              status: booking.status,
            };
          }
        );

        setUserBookings(combinedData);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  console.log(userBookings);

  if(error){
    return <div className="flex flex-col items-center justify-center mt-32 mx-8 xl:mx-60">Error: {error}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32 mx-8 xl:mx-60">
      <h3 className="text-3xl font-bold my-2">Admin Reservaciones</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
        <thead className="text-xs text-gray-50 uppercase bg-[#0c0a29]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre de Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Entrada
            </th>
            <th scope="col" className="px-6 py-3">
              Salida
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
        {userBookings.length===0?(<span className="mt-2 text-4xl text-center tracking-wider text-yellow-700 font-medium">No se encontraron reservaciones</span>):(
          userBookings.map((booking, index) => (
            <AdminUserReservationList {...booking} key={index}/>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};
