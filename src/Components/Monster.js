import React from 'react';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';

const Monster = () => {
  const monster = useSelector((state) => state.fight.monster); // Asegúrate de usar el selector correcto

  if (!monster || typeof monster.pv === 'undefined' || typeof monster.pvMax === 'undefined') {
    console.log("Estado del monstruo:", monster); // Agrega una consola para imprimir el estado del monstruo y depurar
    return <div>No monster data available</div>;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="card-monstre col-sm-12">
            <div id="monsterCard">
              <div className="text-center">
                <div className="row">
                  <div className="col-sm-2 offset-sm-3">
                    <span className="badge badge-danger ml-2 " id="degatSpanMonster"></span>
                    <img className="img-fluid" src={`images/Exor.png`} alt='monster' />
                  </div>

                  <div id="comboOnMonster" className="col-sm-6">
                  </div>
                </div>
              </div>
              <ProgressBar pv={monster.pv} pvMax={monster.pvMax} bgType='bg-danger' faType='fa-heart' barName=' : pv' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Monster;
