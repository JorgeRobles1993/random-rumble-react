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
    <div className="monster">
      <h2>{monster.name} {monster.pv}/{monster.pvmax}</h2>
      <HealthBar pv={monster.pv} pvmax={monster.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-danger' />
      
      <img src="/images/Exor.png" alt="Monster" width="250" /> {/* Muestra la imagen del monstruo */}
      {/* Aquí puedes mostrar otra información relevante sobre el monstruo */}
    </div>
  );
};

export default Monster;
