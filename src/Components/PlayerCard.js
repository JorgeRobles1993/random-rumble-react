import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';

const PlayerCard = ({ player }) => {
  const combat = () => {
    console.log('Combat function here');
    // Aquí puedes agregar la lógica para el combate del jugador si es necesario
  };

  return (
    <div className="col-sm-3 card center" id={`joueur${player.id}`}>
      <div className="card-body text-center">
        <img className="img" src={`images/${player.name}.png`} alt={player.name} />
        <h5 className="card-title">{player.name}</h5>
        <ProgressBar pv={player.pv} pvMax={player.pvMax} faType="fa-heart" barName=" : pv " bgType="bg-danger" />
        <ProgressBar pv={player.mana} pvMax={player.manaMax} faType="fa-fire-alt" barName=" : mana " />
        <span className="badge badge-danger ml-2" id="degatSpanJ1"></span>
        <div className="row">
          <div>
            <ButtonCapacity playerId={player.id} onClick={combat} />
            <ButtonCapacity playerId={player.id} onClick={combat} />
            <ButtonCapacity playerId={player.id} onClick={combat} />
            <ButtonCapacity playerId={player.id} onClick={combat} />
            {/* Aquí puedes agregar más botones de capacidad si es necesario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
