import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';
import GetName from './GetName.js';
import GetGameNumber from './GetGameNumber.js';
import GetNameForExistingGame from './GetNameForExistingGame.js';
import NameTakenAlert from './NameTakenAlert.js'
import GameNotExistAlert from './GameNotExistAlert.js'


class Lobby extends Component {

  state = {
      games: [],
      playerName: '',
      privateGameCode: '',
      gameToEnter:'',
      showGetName: false
    }


  //LOAD AVAIL GAMES
  componentDidMount() {
    fetch(`${API_ROOT}/games`)
    .then(res => res.json())
    .then(res => this.setState({games: [...res]}))
  }

  //ADD NEW GAMES
  handleReceiveNewGame = (newGame) => {
    this.setState({games: [...this.state.games, newGame]})
  }

  render() {
    return (
      <div>
        <div className='lobbyButtonsContainer'>
          <GetName history={this.props.history}></GetName>
          <GetGameNumber games={this.state.games} history={this.props.history}></GetGameNumber>
      </div>
      <div style={{visibility: 'hidden'}}>
        <GetNameForExistingGame history={this.props.history}></GetNameForExistingGame>
        <NameTakenAlert></NameTakenAlert>
        <GameNotExistAlert></GameNotExistAlert>
      </div>
      <ActionCable
        channel={{ channel: 'LobbyChannel' }}
        onReceived={this.handleReceiveNewGame}
      />
    </div>

    )
  }
}

export default Lobby
