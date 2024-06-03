import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import PlayerList from './Components/PlayerList';
import Monster from './Components/Monster'; // Cambia el nombre de la importación
import './Components/Game.css'; // Importa estilos CSS si es necesario

const App = () => (
  <Provider store={store}>
    <div className="App">
    <img src="/images/Super_Mario_RPG_Logo.png" className='imglogo'/>
      <Monster />
      <PlayerList />
    </div>
  </Provider>
);

export default App;
