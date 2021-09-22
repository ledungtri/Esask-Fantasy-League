import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Playerstats from './playerstats/pages/Playerstats'
function App() {
  return (
    <div className="App">
      <Playerstats loggedin = {true} testID = "playerstats" />
    </div>
  );
}

export default App;
