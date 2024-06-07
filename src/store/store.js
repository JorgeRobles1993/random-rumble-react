import { configureStore } from '@reduxjs/toolkit';
import fightReducer from './fightSlice'; 

const store = configureStore({
  reducer: {
    fight: fightReducer,
  },
});

export default store;
