import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { swapPlayers, hitMonster, hitBack, hitMonsterSpecial } from '../store/fightSlice';
import HealthBar from './HealthBar';

const PlayerCard = ({ player, isFieldPlayer, substitutePlayers }) => {
  const [showSubstituteMenu, setShowSubstituteMenu] = useState(false);
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.fight.allPlayers.find(p => p.id === player.id));
  const substituteMenuRef = useRef(null);

  const attackMonster = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && isFieldPlayer) {
      dispatch(hitMonster());
      console.log(`${currentPlayer.name} atacó al monstruo!`);
      dispatch(hitBack());
      console.log(`El monstruo contraatacó!`);
    } else if (currentPlayer) {
      console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante o no está dentro del equipo activo.`);
    }
  };

  const attackMonsterSpecial = () => {
    if (currentPlayer && currentPlayer.stats.pv > 0 && isFieldPlayer) {
      dispatch(hitMonsterSpecial());
      console.log(`${currentPlayer.name} atacó al monstruo con un ataque especial!!`);
      dispatch(hitBack());
      console.log(`El monstruo contraatacó!`);
    } else if (currentPlayer) {
      console.log(`${currentPlayer.name} no puede atacar porque no tiene vida restante o no está dentro del equipo activo.`);
    }
  };

  const handleSwap = (substitutePlayerId) => {
    dispatch(swapPlayers({ fieldPlayerId: player.id, substitutePlayerId }));
    setShowSubstituteMenu(false); // Hide the menu after swapping
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (substituteMenuRef.current && !substituteMenuRef.current.contains(event.target)) {
        setShowSubstituteMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [substituteMenuRef]);

  return (
    <div className="nes-container is-rounded is-dark">
      <div className="player-info">
        <img src={player.image} alt={player.name} width="150" height="150" />
        <div className="player-details">
          <h3>{player.name}</h3>
          <div className="health-bar-container">
            <HealthBar pv={player.stats.pv} pvmax={player.stats.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-success' />
          </div>
          <div className="button-container">
            <img src={`${process.env.PUBLIC_URL}/images/Button A.png`} alt="Attack" onClick={attackMonster} className="button-image" />
            <img src={`${process.env.PUBLIC_URL}/images/Button B.png`} alt="Special Attack" onClick={attackMonsterSpecial} className="button-image" />
          </div>
        </div>
      </div>
      {isFieldPlayer && (
        <div className="substitute-container" ref={substituteMenuRef}>
          <button onClick={() => setShowSubstituteMenu(!showSubstituteMenu)}>
            <i className="snes-logo"></i>
          </button>
          {showSubstituteMenu && (
            <div className="substitute-menu">
              {substitutePlayers.map(sub => (
                <button key={sub.id} className="nes-btn is-primary" onClick={() => handleSwap(sub.id)}>
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
