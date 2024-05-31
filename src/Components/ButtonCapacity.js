// // ButtonCapacity.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { hitMonster, hitBack } from '../store/fightSlice';

// const ButtonCapacity = ({ playerId }) => {
//   const dispatch = useDispatch();
//   const player = useSelector(state => state.fight.players.find(p => p.id === playerId));
  

//   // const combat = () => {
//   //   if (player && player.pv > 0) {
//   //     dispatch(hitMonster({ damage: 5 }));
//   //     dispatch(hitBack({ playerId: playerId, damage: Math.floor(Math.random() * (20 - 5 + 1)) + 5 }));
//   //     console.log('¡Auch!');
//   //   } else if (player) {
//   //     console.log(`${player.name} cannot attack because they have no life remaining.`);
//   //   }
//   // }


//   return (
//     <button type="button" onClick={combat} className="btn btn-success material-tooltip-main">
//       Hit <i className="fas fa-bomb"></i> 5 <i className="fas fa-fire-alt"></i> - 5
//     </button>
//   );
// }

// export default ButtonCapacity;
