import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';


class Lobby extends Component {

  state = {
    games: []
  }

  componentDidMount() {
    fetch(`${API_ROOT}/games`, {
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => this.setState({games: [...res]}))
  }

  handleReceiveNewGame = (newGame) => {
    this.setState({games: [...this.state.games, newGame]})
  }

  createNewGame = () => {
    fetch(`${API_ROOT}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => this.props.history.push(`games/${res.id}`))
  }

  handleJoinGame = (e) => {
    e.preventDefault()
    let gameId = e.currentTarget.firstChild.value
    if (this.state.games.includes(g => g.id === gameId)) {
      this.props.history.push(`games/${gameId}`)
    }
    else {
      window.alert("that game doesn't exist")
    }
  }

  handleCreatePlayerName = (e) => {
    e.preventDefault()
    let gameId = e.currentTarget.firstChild.value
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.createNewGame}>Start New Game</button>
        </div>
        //
        // <div>
        //   Enter your player name here:
        //   <input></input>
        //   <button>OK</button>
        // </div>
        <div>
          Enter Game Id here:
          <form onSubmit={this.handleJoinGame}>
            <input></input>
            <input type='submit'></input>
          </form>
        </div>
        {this.state.games.map(g => <li>{g.id}</li>)}
        <ActionCable
          channel={{ channel: 'LobbyChannel' }}
          onReceived={this.handleReceiveNewGame}
        />
      </div>
    )
  }
}

export default Lobby
