
import { useSelector } from "react-redux";
import ReservationForm from "../components/reservationForm/ReservationForm";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Rooms } from "./RoomsPage";





export default function ReservationPage() {
  const {id} = useParams<{id:string}>();
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const [selectedRoom, setSelectedRoom] = useState<Rooms>()

  useEffect(() => {
    const filteredRoom = rooms.filter(room=> room.id.toString() === id);
    setSelectedRoom(filteredRoom[0])
    
    
  }, [id,rooms])

  return (
    <>
    <ReservationForm {...selectedRoom} />
    </>
  )
}
