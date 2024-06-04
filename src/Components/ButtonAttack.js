import React from 'react';
import { hitMonster, hitBack } from '../store/fightSlice';
import { useDispatch } from 'react-redux';


const ButtonAttack = (props) => {
  const dispatch = useDispatch();
  const currentPlayer = props.currentPlayerProps;
  function attack(){
      if (currentPlayer && currentPlayer.stats.pv > 0 && props.isFieldPlayerProps) {
        dispatch(hitMonster());
        console.log(`${currentPlayer.name} atacó al monstruo!`);
        dispatch(hitBack());
        console.log(`El monstruo contraatacó!`);
      } else if (currentPlayer) {
        console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante o no está dentro del equipo activo.`);
      }
  }

    return (
        <img src={`${process.env.PUBLIC_URL}/images/Button A.png`} alt="Attack" onClick={attack} className="button-image" />
    )

};

export default ButtonAttack;