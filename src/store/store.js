// store.js
import { configureStore } from '@reduxjs/toolkit';
import fightReducer from './fightSlice';  // Asegúrate de que la ruta sea correcta

const store = configureStore({
  reducer: {
    fight: fightReducer,
  },
});

export default store;
