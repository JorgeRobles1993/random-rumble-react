import React from 'react';
import './Game.css';
import Monster from './Monster';
import PlayerList from './PlayerList';

//remplacer votre class App.js par cette notation
const App = () => (
  <div className="App">
      <Monster />
      <br></br>
      <section className="container-fluid">
          <PlayerList />
      </section>
  </div>
)

export default App;