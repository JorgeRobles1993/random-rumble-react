  import { createSlice } from '@reduxjs/toolkit';

  export const fightSlice = createSlice({
    name: 'fight',
    initialState: {
      allPlayers: [
        { id: 1, name: 'Mario', image: '/images/Mario.png', stats: { pv: 200, pvmax: 200 }, specialAttack: 'Mario: Daño entre 10 y 50.' },
        { id: 2, name: 'Mallow', image: '/images/Mallow.png', stats: { pv: 100, pvmax: 100 }, specialAttack: 'Mallow: Cura a todos los jugadores entre 20 y 40 puntos de vida.' },
        { id: 3, name: 'Geno', image: '/images/Geno.png', stats: { pv: 150, pvmax: 150 }, specialAttack: 'Geno: Incrementa el Mana del grupo en 10 puntos.' },
        { id: 4, name: 'Peach', image: '/images/Peach.png', stats: { pv: 100, pvmax: 100 }, specialAttack: 'Peach: Cura totalmente al jugador con menos vida.' },
        { id: 5, name: 'Bowser', image: '/images/Bowser.png', stats: { pv: 300, pvmax: 300 }, specialAttack: 'Bowser: Daño entre 30 y 100.' },
      ],
      fieldPlayers: [1, 2, 3],
      substitutePlayers: [4, 5], 
      monsters: [
        { id: 1, name: 'Beezo', pv: 50, pvmax: 50, attack: 1, image: '/images/Beezo.png' },
        { id: 2, name: 'Marmoufle', pv: 75, pvmax: 75, attack: 3, image: '/images/Marmoufle.png' },
        { id: 3, name: 'Cholao Donk', pv: 100, pvmax: 100, attack: 5, image: '/images/Cholao Donk.png' },
        { id: 4, name: 'Croco', pv: 200, pvmax: 200, attack: 10, image: '/images/Croco.png' },
        { id: 5, name: 'Javalinovitch', pv: 300, pvmax: 300, attack: 15, image: '/images/Javalinovitch.png' },
        { id: 6, name: 'Exor', pv: 400, pvmax: 400, attack: 20, image: '/images/Exor.png' },
        { id: 8, name: 'Smithy', pv: 500, pvmax: 500, attack: 30, image: '/images/Smithy.png' },
        { id: 9, name: 'Culex', pv: 9999, pvmax: 9999, attack: 9999, image: '/images/Culex.png' },
      ],
      activeMonsterIndex: 0,
      Mana: 30,
      ManaMax: 30,
      turns: [], 
    },
    reducers: {
      swapPlayers: (state, action) => {
        const { fieldPlayerId, substitutePlayerId } = action.payload;
        const fieldPlayerIndex = state.fieldPlayers.indexOf(fieldPlayerId);
        const substitutePlayerIndex = state.substitutePlayers.indexOf(substitutePlayerId);

        if (fieldPlayerIndex !== -1 && substitutePlayerIndex !== -1) {
          
          state.fieldPlayers[fieldPlayerIndex] = substitutePlayerId;
          state.substitutePlayers[substitutePlayerIndex] = fieldPlayerId;
        }
      },
      hitMonster: (state, action) => {
        const { playerId } = action.payload;
        if (!state.turns.includes(playerId)) {
          const activeMonster = state.monsters[state.activeMonsterIndex];
          const damage = Math.floor(Math.random() * 10) + 1; 
          activeMonster.pv = Math.max(0, activeMonster.pv - damage); 
          state.Mana = Math.min(state.Mana + 1, state.ManaMax); 
          state.turns.push(playerId); 
          if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
            state.activeMonsterIndex += 1; 
            state.turns = []; 
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

          
          if (state.turns.length >= nbAlivePlayers) {
            console.log("raz du tableau", state.turns);
            state.turns = []; 
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
            case 2: // Mallow 
              players.forEach(player => {
                const heal = Math.floor(Math.random() * 20) + 20; 
                player.stats.pv = Math.min(player.stats.pv + heal, player.stats.pvmax);
              });
              break;
              case 3: // Geno
              const manaIncrease = 15; 
              state.Mana = Math.min(state.Mana + manaIncrease, state.ManaMax); 
              break;
            case 4: // Peach 
              const playerToHeal = players.reduce((prev, current) => (prev.stats.pv < current.stats.pv ? prev : current));
              const heal = Math.floor(Math.random() * 20) + 200; 
              playerToHeal.stats.pv = Math.min(playerToHeal.stats.pv + heal, playerToHeal.stats.pvmax);
              break;
            case 5: // Bowser
              damage = Math.floor(Math.random() * 100) + 30; 
              activeMonster.pv = Math.max(0, activeMonster.pv - damage);
              break;
            default:
              damage = 0;
          }

          state.Mana = Math.max(0, state.Mana - 5); 
          state.turns.push(playerId); 

          if (activeMonster.pv <= 0 && state.activeMonsterIndex < state.monsters.length - 1) {
            state.activeMonsterIndex += 1; 
            state.turns = []; 
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
          if (state.turns.length >= nbAlivePlayers) {
            state.turns = []; 
          }
        }
      },
      hitBack: (state, action) => {
        const players = state.allPlayers.filter(player => state.fieldPlayers.includes(player.id)); 
        const randomPlayerIndex = Math.floor(Math.random() * players.length); 
        const randomPlayer = players[randomPlayerIndex]; 

        const activeMonster = state.monsters[state.activeMonsterIndex];
        const monsterAttack = activeMonster.attack;

        
        const minDamage = Math.floor(monsterAttack * 0.5); 
        const maxDamage = Math.floor(monsterAttack * 1.5); 

        
        const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

        
        randomPlayer.stats.pv = Math.max(0, randomPlayer.stats.pv - damage);

        
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