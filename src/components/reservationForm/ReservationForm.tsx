import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

interface RoomBookingFormProps {
  id?: string
  type?: string
  number?: string
  price?: string
}

export default function ReservationForm({ type, number, price }: RoomBookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  const handleCheckAvailability = () => {
    console.log("Verificando disponibilidad...")
    // Aquí iría la lógica para verificar la disponibilidad
  }

  const handleBooking = () => {
    console.log("Realizando reserva...")
    // Aquí iría la lógica para realizar la reserva
  }
  return (
    <Card className="w-full max-w-lg mx-auto">
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
                  {checkIn ? format(checkIn, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
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
                  {checkOut ? format(checkOut, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCheckAvailability}>
          Consultar disponibilidad
        </Button>
        <Button onClick={handleBooking}>Reservar</Button>
      </CardFooter>
    </Card>
  )
}

