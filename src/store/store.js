// créer ce fichier dans src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import fightReducer from '../features/fight/fightSlice'

export const store = configureStore({
  reducer: {
    fight: fightReducer
  },
});

//TEST 3// 