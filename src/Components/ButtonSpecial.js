import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonsterSpecial, hitBack } from '../store/fightSlice';

const ButtonSpecial = (props) => {
  const dispatch = useDispatch();
  const mana = useSelector(state => state.fight.Mana);
  const currentPlayer = props.currentPlayerProps;

  const attackSpecial = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && props.isFieldPlayerProps) {
      if (mana >= 5) {
        dispatch(hitMonsterSpecial({ playerId: currentPlayer.id }));
        console.log(`${currentPlayer.name} usó una habilidad especial! Mana restante: ${mana - 5}`);
        dispatch(hitBack());
        console.log(`El monstruo contraatacó!`);
      } else {
        console.log('Mana insuficiente para realizar el ataque especial.');
      }
    } else if (currentPlayer) {
      console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante o no está dentro del equipo activo.`);
    }
  }

  return (
    <img 
      src={`${process.env.PUBLIC_URL}/images/Button B.png`} 
      alt="Special Attack" 
      onClick={attackSpecial} 
      className="button-image" 
    />
  );
};

export default ButtonSpecial;
