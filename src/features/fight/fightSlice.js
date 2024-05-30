import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [
    { name: "Mario", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1, avatar: "Mario.png" },
    { name: "Mallow", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2, avatar: "Mallow.png" },
    { name: "Geno", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3, avatar: "Geno.png" },
    { name: "Princess Peach", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4, avatar: "Princess Peach.png"},
    { name: "Bowser", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 5, avatar: "Bowser.png"}
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
