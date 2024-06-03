import { createSlice } from '@reduxjs/toolkit';

export const fightSlice = createSlice({
  name: 'fight',
  initialState: {
    allPlayers: [
      { id: 1, name: 'Mario', image: '/images/Mario.png', stats: { pv: 100, pvmax: 100 } },
      { id: 2, name: 'Mallow', image: '/images/Mallow.png', stats: { pv: 100, pvmax: 100 } },
      { id: 3, name: 'Geno', image: '/images/Geno.png', stats: { pv: 100, pvmax: 100 } },
      { id: 4, name: 'Peach', image: '/images/Peach.png', stats: { pv: 100, pvmax: 100 } },
      { id: 5, name: 'Bowser', image: '/images/Bowser.png', stats: { pv: 100, pvmax: 100 } },
    ],
    fieldPlayers: [1, 2, 3], // IDs de jugadores en el campo
    substitutePlayers: [4, 5], // IDs de jugadores suplentes
    monsters: [
      { id: 1, name: 'Beezo', pv: 50, pvmax: 50, attack: 1, image: '/images/Beezo.png' },
      { id: 2, name: 'Marmoufle', pv: 100, pvmax: 100, attack: 3, image: '/images/Marmoufle.png' },
      { id: 3, name: 'Cholao Donk', pv: 200, pvmax: 200, attack: 5, image: '/images/Cholao Donk.png' },
      { id: 4, name: 'Croco', pv: 500, pvmax: 500, attack: 10, image: '/images/Croco.png' },
      { id: 5, name: 'Javalinovitch', pv: 750, pvmax: 750, attack: 15, image: '/images/Javalinovitch.png' },
      { id: 6, name: 'Exor', pv: 1000, pvmax: 1000, attack: 20, image: '/images/Exor.png' },
      { id: 8, name: 'Smithy', pv: 2000, pvmax: 2000, attack: 30, image: '/images/Smithy.png' },
      { id: 9, name: 'Culex', pv: 9999, pvmax: 9999, attack: 9999, image: '/images/Culex.png' },

      // Añadir más monstruos aquí si es necesario
    ],
    activeMonsterIndex: 0,
    Mana: 30,
    ManaMax: 30,
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
      const activeMonster = state.monsters[state.activeMonsterIndex];
      const damage = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
      activeMonster.pv = Math.max(0, activeMonster.pv - damage); // Reducir la salud del monstruo según el daño recibido
      state.Mana++;
      
      if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
        state.activeMonsterIndex += 1; // Cambiar al siguiente monstruo
      }
    },
    hitMonsterSpecial: (state, action) => {
      const activeMonster = state.monsters[state.activeMonsterIndex];
      const damage = Math.floor(Math.random() * 100) + 1; // Generar un número aleatorio entre 1 y 100
      activeMonster.pv = Math.max(0, activeMonster.pv - damage); // Reducir la salud del monstruo según el daño recibido

      if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
        state.activeMonsterIndex += 1; // Cambiar al siguiente monstruo
      }
    },
    hitBack: (state, action) => {
      const players = state.allPlayers.filter(player => state.fieldPlayers.includes(player.id)); // Filtrar jugadores en el campo
      const randomPlayerIndex = Math.floor(Math.random() * players.length); // Obtener un índice aleatorio dentro del rango de jugadores en el campo
      const randomPlayer = players[randomPlayerIndex]; // Obtener un jugador aleatorio
      const damage = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10

      // Reducir la salud del jugador seleccionado según el daño del contraataque
      randomPlayer.stats.pv = Math.max(0, randomPlayer.stats.pv - damage); 
    },
  },
});

export const { swapPlayers, hitMonster, hitBack, hitMonsterSpecial } = fightSlice.actions;

export default fightSlice.reducer;
