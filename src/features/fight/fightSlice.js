import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [
    { name: "Stephane", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1, avatar: "Stephane.png" },
    { name: "ChineseCPM", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2, avatar: "ChineseCPM.png" },
    { name: "Princess", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3, avatar: "Princess.png" },
    { name: "Karl Marx", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4, avatar: "Karl Marx.png"}
  ],
  monster: {pv: 1000, pvMax: 1000},
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      state.monster.pv -= action.payload.damage;
    },
    hitBack: (state) => {
      const monsterDamage = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // daño del monstruo cuando contraataca

      // Seleccionar un jugador aleatorio
      const randomIndex = Math.floor(Math.random() * state.players.length);
      const randomPlayer = state.players[randomIndex];

      // Reducir la vida del jugador aleatorio
      state.players = state.players.map(player => 
        player.id === randomPlayer.id
          ? { ...player, pv: Math.max(player.pv - monsterDamage, 0) }
          : player
      );
    }
  }
});

export const { hitMonster, hitBack } = fightSlice.actions;

export default fightSlice.reducer;
