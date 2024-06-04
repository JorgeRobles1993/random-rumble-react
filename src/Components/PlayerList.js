import React from 'react';
import { useSelector } from 'react-redux';
import PlayerCard from './PlayerCard';
import Mana from './Mana';

const PlayerList = () => {
  const allPlayers = useSelector(state => state.fight.allPlayers);
  const fieldPlayers = useSelector(state => state.fight.fieldPlayers);
  const substitutePlayers = useSelector(state => state.fight.substitutePlayers);

  const getPlayerById = (id) => allPlayers.find(player => player.id === id);

  return (
    <div>
      <h2>Active Players</h2>
      <div className='divtotal'>
        <Mana />
      <div className="active-players">
        {fieldPlayers.map(id => (
          <PlayerCard
          key={id}
          player={getPlayerById(id)}
          isFieldPlayer={true}
          substitutePlayers={substitutePlayers.map(subId => getPlayerById(subId))}
          />
        ))}
      </div>
        <img src='/images/Flower.png' style={{ height: "150px", width: "150px", filter: 'opacity(0)'}} />
      </div>
      <h2>Substitute Players</h2>
      <div className="substitute-players">
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
