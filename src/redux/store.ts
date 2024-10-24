import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './roomsSlice';
import roleReducer from './roleSlice';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    role: roleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Define los tipos estrictos para el estado y el dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
