import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonster, hitBack } from '../store/fightSlice';

const ButtonAttack = (props) => {
  const dispatch = useDispatch();
  const currentPlayer = props.currentPlayerProps;
  const turns = useSelector(state => state.fight.turns);
  
  const attack = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && props.isFieldPlayerProps && !turns.find((idTurn) => idTurn == currentPlayer.id)) {

      dispatch(hitMonster({ playerId: currentPlayer.id }));
      console.log(`${currentPlayer.name} atacó al monstruo!`);

      setTimeout(() => {
        dispatch(hitBack());
        console.log(`El monstruo contraatacó!`);
      }, 1000); 
    } else if (currentPlayer) {
      console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante, no está dentro del equipo activo o no es su turno de atacar.`);
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
