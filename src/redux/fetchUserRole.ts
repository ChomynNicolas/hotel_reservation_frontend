import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setRole } from './roleSlice';
import { AppDispatch } from './store';

// Define la respuesta del backend
interface UserRoleResponse {
  role: string;
}

// Thunk para obtener el rol del usuario
export const fetchUserRole = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'role/fetchUserRole',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get<UserRoleResponse>('http://127.0.0.1:5000/api/user/role', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Token JWT de localStorage
        },
      });

      const role = response.data.role;

      // Actualizar el estado de Redux con el rol obtenido
      dispatch(setRole(role));
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      dispatch(setRole(undefined)); // Manejar error y establecer rol a `undefined`
    }
  }
);
