import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import BoardDash from './view/BoardDash';
import Boards from "./view/Boards"
import Cards from "./view/Cards"
import Teams from "./view/Teams"
import UserLogin from './view/UserLogin';
import UserRegistration from './view/UserRegistration';
import TeamBoards from './view/TeamBoards';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={UserLogin} />
          <Route path='/login' component={UserLogin} />
          <Route path='/signup' component={UserRegistration} />
          <Route path='/boards' component={Boards} />
          <Route path='/:id/teamboards' component={TeamBoards} />
          <Route path='/board/:id' component={BoardDash} />
          <Route path='/:id/teams' component={Teams} />
          <Route path='/:id/cards' component={Cards} />
        </Switch>
      </Router>

    );
  }
}

export default App;
