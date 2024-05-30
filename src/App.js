// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import PlayerList from './Components/PlayerList';
import Monster from './Components/Monster'; // Cambia el nombre de la importación
import './Components/Game.css'; // Importa estilos CSS si es necesario

const App = () => (
  <Provider store={store}>
    <div className="App">
      <h1 className='game'>Super Mario RPG</h1>
      <Monster /> {/* Coloca el componente del monstruo aquí */}
      <PlayerList />
    </div>
  </Provider>
);

export default App;
