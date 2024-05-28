// créer ce fichier dans src/features/fight/fightSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO : Compléter 'players' et 'monster'
  players: [
     { name: "Stephane", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1, avatar: "player1.png" },
     { name: "Chinese Communist Party Member", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2, avatar: "player2.png" },
     { name: "Princess Boheme", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3, avatar: "player3.png" },
     { name: "Karl Marx", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4, avatar: "player4.png"}
  ],
  monster: 
    {pv: 1000, pvMax: 1000},
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      state.monster = {
        ...state.monster,
        pv: state.monster.pv - action.payload.damage,
      };
    },
    hitBack: (state, action) => {
      state.players = {
        ...state.players,
        pv: state.players.pv - action.payload.damage,
      }
    }

  }
});
export const { hitMonster } = fightSlice.actions

export default fightSlice.reducer;