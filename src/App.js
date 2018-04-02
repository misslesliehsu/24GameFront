import React, { Component } from 'react'
import './App.css'
import { Redirect, Switch, Route, withRouter } from 'react-router-dom'
import Game from './Game.js'
import Header from './Header.js'
import Lobby from './Lobby'


class App extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path='/home' component={Lobby}/>
          <Route exact path='/games/:id/' component={Game}/>
          <Redirect to='/home'/>
        </Switch>
      </div>
    )
  }

}


export default App
