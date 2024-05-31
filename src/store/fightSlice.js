import { createSlice } from '@reduxjs/toolkit';

export const fightSlice = createSlice({
  name: 'fight',
  initialState: {
    allPlayers: [
      { id: 1, name: 'Mario', image: '/images/Mario.png', stats: { pv: 100, pvmax: 100 } },
      { id: 2, name: 'Mallow', image: '/images/Mallow.png', stats: { pv: 100, pvmax: 100 } },
      { id: 3, name: 'Geno', image: '/images/Geno.png', stats: { pv: 100, pvmax: 100 } },
      { id: 4, name: 'Princess Peach', image: '/images/Princess Peach.png', stats: { pv: 100, pvmax: 100 } },
      { id: 5, name: 'Bowser', image: '/images/Bowser.png', stats: { pv: 100, pvmax: 100 } },
    ],
    fieldPlayers: [1, 2, 3], // IDs de jugadores en el campo
    substitutePlayers: [4, 5], // IDs de jugadores suplentes
    monster: {
      id: 1,
      name: 'Croco',
      pv: 500,
      pvmax: 500,
      attack: 10,
      image: '/images/Croco.png'
    },
  },
  reducers: {
    swapPlayers: (state, action) => {
      const { fieldPlayerId, substitutePlayerId } = action.payload;
      const fieldPlayerIndex = state.fieldPlayers.indexOf(fieldPlayerId);
      const substitutePlayerIndex = state.substitutePlayers.indexOf(substitutePlayerId);

      if (fieldPlayerIndex !== -1 && substitutePlayerIndex !== -1) {
        // Intercambiar jugadores
        state.fieldPlayers[fieldPlayerIndex] = substitutePlayerId;
        state.substitutePlayers[substitutePlayerIndex] = fieldPlayerId;
      }
    },
    hitMonster: (state, action) => {
      const damage = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
      state.monster.pv = Math.max(0, state.monster.pv - damage); // Reducir la salud del monstruo según el daño recibido
      
      if (state.monster.pv <= 0) {
        state.monster = {
          id: 2,
          name: 'Exor',
          pv: 1000,
          pvmax: 1000,
          attack: 15,
          image: '/images/Exor.png'
        };
      }
    },
    hitMonsterSpecial: (state, action) => {
      const damage = Math.floor(Math.random() * 100) + 1; // Generar un número aleatorio entre 1 y 10
      state.monster.pv = Math.max(0, state.monster.pv - damage); // Reducir la salud del monstruo según el daño recibido
    },
    
    hitBack: (state, action) => {
      const players = state.allPlayers.filter(player => state.fieldPlayers.includes(player.id)); // Filtrar jugadores en el campo
      const randomPlayerIndex = Math.floor(Math.random() * players.length); // Obtener un índice aleatorio dentro del rango de jugadores en el campo
      const randomPlayer = players[randomPlayerIndex]; // Obtener un jugador aleatorio
      const damage = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10 si no se proporciona uno

      // Reducir la salud del jugador seleccionado según el daño del contraataque
      randomPlayer.stats.pv = Math.max(0, randomPlayer.stats.pv - damage); 
    },
  },
});

export const { swapPlayers, hitMonster, hitBack, hitMonsterSpecial } = fightSlice.actions;

export default fightSlice.reducer;
