import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "axios";
import clsx from "clsx";

interface RoomBookingFormProps {
  id?: string;
  type?: string;
  number?: string;
  price?: string;
}

interface ApiResponse {
  error?: string;
  message?: string;
}

const roomImages = {
  "Standard": "https://hotelmolinodeviento.co/wp-content/uploads/2021/01/HABITACION-SENCILLA-1-1024x768.jpg",
  "Deluxe": "https://preciadoshotel.com/wp-content/uploads/2019/12/O2A8576.jpg",
  "Suite": "https://images.mirai.com/HOST/500255/room-24672.jpg",
  "Penthouse": "https://s3.abcstatics.com/media/MM/2017/10/27/hotel-president-wilson-habitacion-tres-kvwC--1333x900@abc.jpg",
  // Add more room types and their corresponding image paths as needed
};






export default function ReservationForm({
  type,
  number,
  price,
  id,
}: RoomBookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [dateError, setDateError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | undefined>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const handleCheckInChange = (date: Date | undefined) => {
    setInfoMessage("");
    setCheckIn(date);
    if (checkOut && date && date >= checkOut) {
      setDateError(
        "La fecha de entrada debe ser anterior a la fecha de salida"
      );
    } else {
      setDateError(null);
    }
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    setInfoMessage("");
    setCheckOut(date);
    if (checkIn && date && date <= checkIn) {
      setDateError(
        "La fecha de salida debe ser posterior a la fecha de entrada"
      );
    } else {
      setDateError(null);
    }
  };

  const handleCheckAvailability = async (
    checkIn: Date | undefined,
    checkOut: Date | undefined,
    roomNumber?: string
  ) => {
    try {
      if (dateError || !checkIn || !checkOut) {
        setDateError("Por favor, seleccione fechas válidas");
        return;
      }

      const data = {
        check_in_date: checkIn,
        check_out_date: checkOut,
        room_number: roomNumber || null,
      };
      console.log("Verificando disponibilidad...");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/rooms/availability",
        data
      );

      if (response.status === 200) {
        const responseData = response.data;

        if (Array.isArray(responseData)) {
          console.log("Habitaciones disponibles: ", responseData);

          return responseData;
        } else if (responseData.message) {
          console.log(responseData.message);
          setInfoMessage(responseData.message);
          setIsAvailable(responseData.isAvailable);
        }
      } else {
        console.log(
          "Error: ",
          response.data.error || "Ocurrió un error desconocido."
        );
      }
    } catch (error) {
      setInfoMessage("Error en el servidor intente de nuevo más tarde");
      setIsAvailable(false);
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en la petición: ",
          error.response?.data?.error || error.message
        );
      } else {
        console.error("Error desconocido: ", error);
      }
    }
  };

  const handleBooking = async (
    checkIn: Date | undefined,
    checkOut: Date | undefined,
    id: string | undefined
  ) => {
    try {
      if (dateError || !checkIn || !checkOut) {
        console.log("Por favor, seleccione fechas válidas");
        return;
      }

      console.log("Realizando reserva...");

      const token = localStorage.getItem("accessToken");

      if (!token || !id) {
        setInfoMessage("El inicio de sesión expiro");
        setIsAvailable(false);
        return;
      }

      const data = {
        check_in_date: checkIn,
        check_out_date: checkOut,
        room_id: id,
      };

      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:5000/api/bookings",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Reserva realizada con éxito");
        setInfoMessage("Reserva realizada con éxito");
        setIsAvailable(true);
      }
    } catch (error) {
      setInfoMessage("Error en el servidor intente de nuevo más tarde");
      setIsAvailable(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log(error.response.data.error);
            setInfoMessage(error.response.data.error);
            setIsAvailable(false);
          } else {
            console.log(error.response.data.error);
            setInfoMessage(error.response.data.error);
            setIsAvailable(false);
          }
        }
      } else {
        console.error("Error desconocido: ", error);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-start justify-center mt-36 mx-8 xl:mx-60 gap-8">
      <div className="w-full md:w-1/3">
        <img
          src={roomImages[type as keyof typeof roomImages] || roomImages.Standard}
          alt={`${type} room`}
          className="rounded-lg object-cover w-full h-auto md:h-[340px]"
        />
      </div>
    <Card className="w-full md:w-2/3 max-w-lg">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>
          Habitación {number} - ${price} por noche
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="check-in">Fecha de entrada</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? (
                    format(checkIn, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={handleCheckInChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label htmlFor="check-out">Fecha de salida</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-out"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? (
                    format(checkOut, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={handleCheckOutChange}
                  disabled={(date) =>
                    date < new Date() || (checkIn ? date <= checkIn : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {dateError && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            {dateError}
          </p>
        )}
        {infoMessage && (
          <p
            className={clsx(
              "text-sm mt-2",
              isAvailable ? "text-green-500" : "text-red-500"
            )}
            role="status"
          >
            {infoMessage}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleCheckAvailability(checkIn, checkOut, number)}
        >
          Consultar disponibilidad
        </Button>
        <Button onClick={() => handleBooking(checkIn, checkOut, id)}>
          Reservar
        </Button>
      </CardFooter>
      <p className="text-center mb-2 text-sm font-semibold text-gray-600">*Al reservar no se aplicara ningun cargo</p>
    </Card>
    </div>
  );
}
