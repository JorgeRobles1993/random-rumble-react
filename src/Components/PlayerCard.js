import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { swapPlayers } from '../store/fightSlice';
import HealthBar from './HealthBar';
import ButtonAttack from './ButtonAttack';
import ButtonSpecial from './ButtonSpecial';

const PlayerCard = ({ player, isFieldPlayer, substitutePlayers }) => {
  const [showSubstituteMenu, setShowSubstituteMenu] = useState(false);
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.fight.allPlayers.find(p => p.id === player.id));
  const substituteMenuRef = useRef(null);
  const turns = useSelector(state => state.fight.turns);

  const handleSwap = (substitutePlayerId) => {
    dispatch(swapPlayers({ fieldPlayerId: player.id, substitutePlayerId }));
    setShowSubstituteMenu(false); // Oculta el menú después de realizar el intercambio
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

  const isAlive = currentPlayer.stats.pv > 0;

  function isDoigts(){
    let display = true;
    turns.forEach(idTurn => {
      if(idTurn == player.id)
        display = false;
    });
    return display && isFieldPlayer && isAlive ? <><img className="gant" src='./images/guante.png'/></> : null;
  }
  return (
    <div className={`nes-container is-rounded is-dark ${isAlive ? '' : 'grayed-out'}`}>
      <div className="player-info">
        {isDoigts()}
        <img className={`player-info ${isAlive ? '' : 'player-info-dead'}`} src={player.image} alt={player.name} width="150" height="150" />
        <div className="player-details">
          <h3>{player.name}</h3>
          <div className="health-bar-container">
            <HealthBar pv={player.stats.pv} pvmax={player.stats.pvmax} faType='fa-heart' barName=' : pv' bgType='bg-success' />
          </div>
          <div className="button-container">
            <ButtonAttack currentPlayerProps={currentPlayer} isFieldPlayerProps={isFieldPlayer} />
            <ButtonSpecial currentPlayerProps={currentPlayer} isFieldPlayerProps={isFieldPlayer} />
          </div>
        </div>
      </div>
      {isFieldPlayer && player.id != 1 &&(
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
