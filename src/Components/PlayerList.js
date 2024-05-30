// PlayerList.js
import React from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
  const allPlayers = useSelector(state => state.fight.allPlayers);
  const fieldPlayers = useSelector(state => state.fight.fieldPlayers);
  const substitutePlayers = useSelector(state => state.fight.substitutePlayers);

  const getPlayerById = (id) => allPlayers.find(player => player.id === id);

  return (
    <div>
      <h2>Active Players</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {fieldPlayers.map(id => (
          <PlayerCard
            key={id}
            player={getPlayerById(id)}
            isFieldPlayer={true}
            substitutePlayers={substitutePlayers.map(subId => getPlayerById(subId))}
          />
        ))}
      </div>
      <h2>Substitute Players</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {substitutePlayers.map(id => (
          <PlayerCard
            key={id}
            player={getPlayerById(id)}
            isFieldPlayer={false}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
