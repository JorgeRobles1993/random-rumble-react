import React from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
  const players = useSelector((state) => state.fight.players);

  const displayPlayers = () => {
    if (!players || Object.keys(players).length === 0) {
      return <div>No player data available</div>;
    }

    return (
      Object.keys(players).map(key => (
        <div key={players[key].id} className="player">
          <img src={`images/${players[key].avatar}`} alt={players[key].name} />
          <PlayerCard player={players[key]} />
        </div>
      ))
    );
  }

  return (
    <div className='row'>
      {displayPlayers()}
    </div>
  );
}

export default PlayerList;
