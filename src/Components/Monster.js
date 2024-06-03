import React from 'react';
import HealthBar from './HealthBar';
import { useSelector } from 'react-redux';

const Monster = () => {
  const activeMonsterIndex = useSelector((state) => state.fight.activeMonsterIndex);
  const monster = useSelector((state) => state.fight.monsters[activeMonsterIndex]);

  if (!monster) {
    return "No data";
  }

  return (
    <div className="monster nes-container is-rounded is-dark">
      <h3>{monster.name}</h3>
      <HealthBar pv={monster.pv} pvmax={monster.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-danger' />
      <div>
        <img src={monster.image} alt="Monster" width="300" height="300"/>
      </div>
    </div>
  );
};

export default Monster;
