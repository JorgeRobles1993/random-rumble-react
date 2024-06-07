import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import PlayerList from './Components/PlayerList';
import Monster from './Components/Monster'; 
import './Components/Game.css'; 

const App = () => (
  <Provider store={store}>
    <div className="App">
    <img src="/images/Super_Mario_RPG_Logo.png" className='imglogo'/>
    <div>
      <Monster />
      <PlayerList />
    </div>
    </div>
  </Provider>
);

export default App;
