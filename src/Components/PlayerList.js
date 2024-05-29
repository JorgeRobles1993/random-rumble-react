import React from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
  const players = useSelector((state) => state.fight.players);

  const renderPlayerCards = () => {
    if (!players || players.length === 0) {
      return <div>No player data available</div>;
    }

    return players.map(player => (
      <div key={player.id} className="player">
        <PlayerCard player={player} />
      </div>
    ));
  }

  return (
    <div className="row2">
      {renderPlayerCards()}
    </div>
  );
}

export default PlayerList;
