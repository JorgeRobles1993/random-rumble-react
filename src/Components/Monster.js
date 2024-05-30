// Monster.js
import React from 'react';
import HealthBar from './HealthBar';
import { useSelector } from 'react-redux';

const Monster = () => {
  const monster = useSelector((state) => state.fight.monster);
    if(!monster){
      return "no data";
    }
    
  return (
    <div className="nes-container is-rounded is-dark">
      <h2 className='nes-text is-error'>{monster.name}</h2>
      <HealthBar pv={monster.pv} pvmax={monster.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-danger' />
      <div className='monstercard'>
      <img src="/images/Exor.png" alt="Monster" width="300" height="300"/> {/* Muestra la imagen del monstruo */}
      {/* Aquí puedes mostrar otra información relevante sobre el monstruo */}
    </div>
    </div>
  );
};

export default Monster;
