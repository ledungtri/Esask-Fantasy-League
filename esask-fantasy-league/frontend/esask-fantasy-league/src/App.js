import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {TeamCreate} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/create-team' exact component={TeamCreate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
