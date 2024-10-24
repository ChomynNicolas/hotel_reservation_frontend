import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserReservationsList } from "../components/userReservacionList/UserReservationsList";
import { useNavigate } from "react-router-dom";
import useAuthRole from "@/components/hooks/useAuthRole";

interface UserReservationsResponse {
  id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  type?: string;
  room_number?: string;
}

interface ErrorResponse {
  message: string;
}

type ApiResponse = UserReservationsResponse[] | ErrorResponse;

export const UserReservationsPage = () => {

  const [errorMessage, setErrorMessage] = useState("")
  const rooms = useSelector((state: RootState) => state.rooms.rooms);

  const navigate = useNavigate();

  useAuthRole();

  if (rooms.length === 0) {
    navigate("/");
  }

  const [userReservations, setUserReservations] = useState<
    UserReservationsResponse[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get<ApiResponse>("http://127.0.0.1:5000/api/bookings/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if ("message" in response.data) {
          
          setErrorMessage(response.data.message);
          setUserReservations([]);
        } else {
          const userReservations = response.data.map((reservation) => {
            const room = rooms.find((room) => room.id === reservation.room_id);
            return {
              id: reservation.id,
              room_id: reservation.id,
              check_in_date: reservation.check_in_date,
              check_out_date: reservation.check_out_date,
              type: room?.type,
              room_number: room?.number,
              status: reservation.status,
            };
          });
          setUserReservations(userReservations);
        }
      })
      .catch((error) => console.log("Ocurrio un error", error));
  }, [rooms]);

  const handleCancelReservation = (reservationId: string) => {
    
    setUserReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "canceled" }
          : reservation
      )
    );
  };

  console.log(userReservations);

  return (
    <div className="flex flex-col items-center justify-center mt-32 mx-8 xl:mx-60">
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
            {userReservations.map((reservation) => (
              <UserReservationsList
                key={reservation.id}
                {...reservation}
                handleCancelReservation={handleCancelReservation}
              />
            ))}
          </>
        </tbody>
      </table>
      {errorMessage&&(
        <span className="mt-2 text-4xl tracking-wider text-yellow-700 font-medium">{errorMessage}</span>
      )}
    </div>
  );
};
