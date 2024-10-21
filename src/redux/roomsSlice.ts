// src/redux/roomsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el tipo Room
interface Room {
  id: string;
  number: string;
  type: string;
  price: string;
}

interface RoomsState {
  rooms: Room[];
}

// Estado inicial
const initialState: RoomsState = {
  rooms: [],
};

// Crear el slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Acción para almacenar las habitaciones en el estado global
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;

