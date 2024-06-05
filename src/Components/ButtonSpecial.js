import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hitMonsterSpecial, hitBack } from '../store/fightSlice';

const ButtonSpecial = (props) => {
  const dispatch = useDispatch();
  const mana = useSelector(state => state.fight.Mana);
  const currentPlayer = props.currentPlayerProps;
  const activePlayers = useSelector(state => state.fight.allPlayers.filter(player => state.fight.fieldPlayers.includes(player.id) && player.stats.pv > 0));

  const attackSpecial = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && props.isFieldPlayerProps) {
      if (!activePlayers.includes(currentPlayer)) {
        console.log(`${currentPlayer.name} no está activo este turno.`);
        return;
      }

      if (mana >= 5) {
        dispatch(hitMonsterSpecial({ playerId: currentPlayer.id }));
        console.log(`${currentPlayer.name} usó una habilidad especial! Mana restante: ${mana - 5}`);

        setTimeout(() => {
          dispatch(hitBack());
          console.log(`El monstruo contraatacó!`);
        }, 1000); // Retraso de 1 segundo
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
