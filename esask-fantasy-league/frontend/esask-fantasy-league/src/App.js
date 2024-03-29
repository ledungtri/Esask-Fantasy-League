import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home Page/components/HomePage';
import Navbar from './NavBar/components/Navbar';
import PlayerList from './Player List/components/PlayerList';
import ContestList from './ContestList/pages/ContestList';
import {CreateTeam} from "./CreateTeam";
import 'bootstrap/dist/css/bootstrap.min.css';
import TeamStats from './TeamStats/pages/TeamStats';

function App() {

  return (

    <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/players" exact component={PlayerList} />
            <Route path="/contests" exact component={ContestList} />
            <Route path='/create-team' exact component={CreateTeam} />
            <Route path='/team-stats' exact component={TeamStats} />
          </Switch>
        </div>
    </Router>

  );
}

export default App;
