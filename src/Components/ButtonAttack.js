import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack } from '../store/fightSlice';

const ButtonAttack = (props) => {
  const dispatch = useDispatch();
  const currentPlayer = props.currentPlayerProps;
  const activePlayers = useSelector(state => state.fight.allPlayers.filter(player => state.fight.fieldPlayers.includes(player.id) && player.stats.pv > 0));

  const attack = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && props.isFieldPlayerProps) {
      if (!activePlayers.includes(currentPlayer)) {
        console.log(`${currentPlayer.name} no está activo este turno.`);
        return;
      }

      dispatch(hitMonster({ playerId: currentPlayer.id }));
      console.log(`${currentPlayer.name} atacó al monstruo!`);

      setTimeout(() => {
        dispatch(hitBack());
        console.log(`El monstruo contraatacó!`);
      }, 1000); // Retraso de 1 segundo
    } else if (currentPlayer) {
      console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante o no está dentro del equipo activo.`);
    }
  }

  return (
    <img 
      src={`${process.env.PUBLIC_URL}/images/Button A.png`} 
      alt="Attack" 
      onClick={attack} 
      className="button-image" 
    />
  );
};

export default ButtonAttack;
