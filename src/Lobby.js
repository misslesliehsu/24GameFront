import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';


class Lobby extends Component {

  state = {
    games: [],
    playerName: '',
    privateGameCode: '',
    gameToEnter:''
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

  //SUBMIT NEW GAME
  createNewGame = () => {
    fetch(`${API_ROOT}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        }
      })
    .then(res => res.json())
    .then(res => {
      this.setState({gameToEnter: res.id})
      fetch(`${API_ROOT}/games/${res.id}/players`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playerName: this.state.playerName
        })
      })
      .then(res => res.json())
      .then(res => {
        sessionStorage.setItem("id", res.id)
        sessionStorage.setItem("playerName", res.playerName)
        this.props.history.push(`games/${this.state.gameToEnter}`)
      })
    })
  }

  //FINDING & JOINING GAMES
  handleInputGameCode = (e) => {
    this.setState({privateGameCode: e.target.value})
  }

  handleFindGame = () => {
    if (this.state.games.some(g => g.id == this.state.privateGameCode)) {
      this.props.history.push(`games/${this.state.privateGameCode}`)
    }
    else {
      window.alert("that game doesn't exist")
    }
  }

  handleJoinOpenGame = (e) => {
    //create new Player
    let gameId = e.target.id
    fetch(`${API_ROOT}/games/${gameId}/players`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: this.state.playerName
      })
    })
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(res => {
        sessionStorage.setItem("id", res.id)
        sessionStorage.setItem("playerName", res.playerName)
        this.props.history.push(`/games/${gameId}`)
        })
      }
      else {
        res.json().then(res => window.alert(res))
      }
    })
  }

  //SETTING PLAYER NAME
  handlePlayerNameInput = (e) => {
    this.setState({playerName: e.target.value})
  }

  handleSetPlayerName = () => {
    sessionStorage.setItem("playerName", this.state.playerName)
  }


  render() {
    return (
      <div>
        <div>
          <button onClick={this.createNewGame}>Create New Game</button>
        </div>
        {sessionStorage.playerName ?
          <div>
            <h3>Welcome, {sessionStorage.playerName}!</h3>
          </div>
           :
          <div>
            Enter your player name here:
            <input value={this.state.playerName} onChange={this.handlePlayerNameInput}></input>
            <button onClick={this.handleSetPlayerName}>OK</button>
          </div>
        }
        <h3>Find Private Game</h3>
          <input placeholder="Enter Game Code" value={this.state.privateGameCode} onChange={this.handleInputGameCode}></input>
          <button onClick={this.handleFindGame}>OK</button>
        <h3>Open Games</h3>
        {this.state.games.map(g =><div key={g.id}> <li >{g.id}</li><button id={g.id} onClick={this.handleJoinOpenGame}>Join Game</button></div>)}
        <ActionCable
          channel={{ channel: 'LobbyChannel' }}
          onReceived={this.handleReceiveNewGame}
        />
      </div>
    )
  }
}

export default Lobby
