import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home Page/components/HomePage';
import PlayerList from './Player List/components/PlayerList';
import {TeamCreate} from "./CreateTeam";

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/players" exact component={PlayerList} />
            <Route path='/create-team' exact component={TeamCreate} />
          </Switch>
        </div>
    </Router>

  );
}

export default App;
