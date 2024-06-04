import React from 'react';
import { useSelector } from 'react-redux';

function Mana() {
  const mana = useSelector(state => state.fight.Mana);
  const manaMax = useSelector(state => state.fight.ManaMax);

  return (
    <div className='Manaimage nes-container is-rounded is-dark'>
      <img src='/images/Flower.png' width="100px" height="100px" alt="Mana Flower" />
      <div>
        <p>Mana: {mana}/{manaMax}</p>
      </div>
    </div>
  );
}

export default Mana;
