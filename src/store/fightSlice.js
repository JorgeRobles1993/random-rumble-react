import { createSlice } from '@reduxjs/toolkit';

export const fightSlice = createSlice({
  name: 'fight',
  initialState: {
    allPlayers: [
      { id: 1, name: 'Mario', image: '/images/Mario.png', stats: { pv: 100, pvmax: 100 } },
      { id: 2, name: 'Mallow', image: '/images/Mallow.png', stats: { pv: 60, pvmax: 60 } },
      { id: 3, name: 'Geno', image: '/images/Geno.png', stats: { pv: 80, pvmax: 80 } },
      { id: 4, name: 'Peach', image: '/images/Peach.png', stats: { pv: 60, pvmax: 60 } },
      { id: 5, name: 'Bowser', image: '/images/Bowser.png', stats: { pv: 200, pvmax: 200 } },
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
    ],
    activeMonsterIndex: 0,
    Mana: 30,
    ManaMax: 30,
    turns: [], // Registro de turnos de ataque
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
      const { playerId } = action.payload;
      if (!state.turns.includes(playerId)) {
        const activeMonster = state.monsters[state.activeMonsterIndex];
        const damage = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
        activeMonster.pv = Math.max(0, activeMonster.pv - damage); // Reducir la salud del monstruo según el daño recibido
        state.Mana = Math.min(state.Mana + 1, state.ManaMax); // Aumentar el mana pero no sobrepasar el máximo
        state.turns.push(playerId); // Registrar el ataque del jugador

        if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
          state.activeMonsterIndex += 1; // Cambiar al siguiente monstruo
          state.turns = []; // Resetear los turnos para la nueva ronda
        }
        let nbAlivePlayers = 0;
        console.log(state.fieldPlayers);
        state.fieldPlayers.forEach(idPlayer => {
          state.allPlayers.forEach(player => {
            if(idPlayer == player.id && player.stats.pv > 0){
              nbAlivePlayers++;
            }
          });
        })
        console.log("alive cpt:", nbAlivePlayers, "joueurs joué:", state.turns);

        // Verificar si todos los jugadores han atacado
        if (state.turns.length >= nbAlivePlayers) {
          console.log("raz du tableau", state.turns);
          state.turns = []; // Resetear los turnos para la nueva ronda
        }
      }
    },
    hitMonsterSpecial: (state, action) => {
      const { playerId } = action.payload;
      if (!state.turns.includes(playerId)) {
        const activeMonster = state.monsters[state.activeMonsterIndex];
        const players = state.allPlayers.filter(player => state.fieldPlayers.includes(player.id));
        let damage = 0;

        switch (playerId) {
          case 1: // Mario
            damage = Math.floor(Math.random() * 50) + 10; // Daño entre 10 y 50
            activeMonster.pv = Math.max(0, activeMonster.pv - damage);
            break;
          case 2: // Mallow (Cura)
            players.forEach(player => {
              const heal = Math.floor(Math.random() * 20) + 20; 
              player.stats.pv = Math.min(player.stats.pv + heal, player.stats.pvmax);
            });
            break;
            case 3: // Geno
            const manaIncrease = 15; // Incremento fijo de 10 puntos en el Mana
            state.Mana = Math.min(state.Mana + manaIncrease, state.ManaMax); // Incrementar el Mana del grupo
            break;
          case 4: // Peach (Cura)
            const playerToHeal = players.reduce((prev, current) => (prev.stats.pv < current.stats.pv ? prev : current));
            const heal = Math.floor(Math.random() * 20) + 50; 
            playerToHeal.stats.pv = Math.min(playerToHeal.stats.pv + heal, playerToHeal.stats.pvmax);
            break;
          case 5: // Bowser
            damage = Math.floor(Math.random() * 100) + 1; // Daño entre 1 y 100
            activeMonster.pv = Math.max(0, activeMonster.pv - damage);
            break;
          default:
            damage = 0;
        }

        state.Mana = Math.max(0, state.Mana - 5); // Reducir el mana por el coste del ataque especial
        state.turns.push(playerId); // Registrar el ataque del jugador

        if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
          state.activeMonsterIndex += 1; // Cambiar al siguiente monstruo
          state.turns = []; // Resetear los turnos para la nueva ronda
        }
        let nbAlivePlayers = 0;
        console.log(state.fieldPlayers);
        state.fieldPlayers.forEach(idPlayer => {
          state.allPlayers.forEach(player => {
            if(idPlayer == player.id && player.stats.pv > 0){
              nbAlivePlayers++;
            }
          });
        })
        // Verificar si todos los jugadores han atacado
        if (state.turns.length >= nbAlivePlayers) {
          state.turns = []; // Resetear los turnos para la nueva ronda
        }
      }
    },
    hitBack: (state, action) => {
      const players = state.allPlayers.filter(player => state.fieldPlayers.includes(player.id)); // Filtrar jugadores en el campo
      const randomPlayerIndex = Math.floor(Math.random() * players.length); // Obtener un índice aleatorio dentro del rango de jugadores en el campo
      const randomPlayer = players[randomPlayerIndex]; // Obtener un jugador aleatorio

      const activeMonster = state.monsters[state.activeMonsterIndex];
      const monsterAttack = activeMonster.attack;

      // Calcular el rango de daño del monstruo basado en su estadística de ataque
      const minDamage = Math.floor(monsterAttack * 0.5); // Por ejemplo, el daño mínimo puede ser la mitad del ataque del monstruo
      const maxDamage = Math.floor(monsterAttack * 1.5); // El daño máximo puede ser el 150% del ataque del monstruo

      // Generar un número aleatorio dentro del rango de daño
      const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

      // Reducir la salud del jugador seleccionado según el daño del contraataque
      randomPlayer.stats.pv = Math.max(0, randomPlayer.stats.pv - damage);

      //On enlève le joueur du turns si il est mort après le coup 
      state.turns.forEach((idTurns, key) => {
        state.allPlayers.forEach(player => {
          if(player.id == idTurns && player.stats.pv <= 0){
            delete state.turns[key];
          }
        })
      })
    },
    resetTurns: (state) => {
      state.turns = [];
    },
  },
});

export const { swapPlayers, hitMonster, hitBack, hitMonsterSpecial, resetTurns } = fightSlice.actions;

export default fightSlice.reducer;