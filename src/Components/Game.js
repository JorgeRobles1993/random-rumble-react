import React from 'react';
import Monster from './Monster';
import PlayerList from './PlayerList';
import Mana from './Mana'; 

const App = () => (
  <div className="App">
      <Monster />
      <br></br>
      <section className="container-fluid">
          <PlayerList />
          <Mana />
      </section>
  </div>
)

export default App;