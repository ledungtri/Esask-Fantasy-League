import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home Page/components/HomePage';
import Navbar from './NavBar/components/Navbar';
import PlayerList from './Player List/components/PlayerList';

function App() {
  
  return (
    
    <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/players" exact component={PlayerList} />
          </Switch>
        </div>
    </Router>
     
  );
}

export default App;
