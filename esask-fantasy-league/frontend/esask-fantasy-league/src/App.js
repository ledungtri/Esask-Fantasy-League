import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './Home Page/components/HomePage';
import Navbar from './NavBar/components/Navbar';
import PlayerList from './Player List/components/PlayerList';
import {CreateTeam} from "./CreateTeam";

function App() {
  const mockContest = {_id: "613d65ea63676a0636013920", name: "Weekly Contest", startDate: "17/09/2021", endDate: "24/09/2021"};
  return (
    <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/players" exact component={PlayerList} />
            <Route path='/create-team' exact component={() => <CreateTeam contest={mockContest}/>} />
          </Switch>
        </div>
    </Router>

  );
}

export default App;
