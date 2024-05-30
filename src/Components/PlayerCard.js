// PlayerCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { swapPlayers, hitMonster, hitBack } from '../store/fightSlice';
import HealthBar from './HealthBar';
import '../Components/Game.css';

const PlayerCard = ({ player, isFieldPlayer, substitutePlayers }) => {
  const dispatch = useDispatch();

  const attackMonster = () => {
    const damage = Math.floor(Math.random() * 10) + 1; // Daño aleatorio entre 1 y 10
    dispatch(hitMonster({ damage }));
    dispatch(hitBack());
    console.log(`${player.name} atacó al monstruo!`);
  };

  const handleSwap = (substitutePlayerId) => {
    dispatch(swapPlayers({ fieldPlayerId: player.id, substitutePlayerId }));
  };


  return (
    <div className="nes-container is-rounded is-dark">
      <div className="player-info">
        <img src={player.image} alt={player.name} width="300" height="300" />
        <div className="player-details">
          <h3>{player.name}</h3>
          <div className="health-bar-container">
            <HealthBar pv={player.stats.pv} pvmax={player.stats.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-success'/>
          </div>
          <div className="button-container">
            <img src={`${process.env.PUBLIC_URL}/images/Button A.png`} alt="Attack" onClick={attackMonster} className="button-image" />
            <img src={`${process.env.PUBLIC_URL}/images/Button B.png`} alt="Attack" onClick={attackMonster} className="button-image" />
          </div>
        </div>
      </div>
      {isFieldPlayer && (
        <select className="nes-btn" onChange={(e) => handleSwap(Number(e.target.value))}>
          <option value="" disabled selected hidden>Select Substitute</option>
          {substitutePlayers.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PlayerCard;
