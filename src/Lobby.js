import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';
// import GetName from './GetName.js'
// import Test from './Test.js'


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

  handleCreateGame = () => {
    let name = prompt("Choose a player name:")
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
          playerName: name
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

  handleJoinGame = () => {
    let gameId = prompt("Please enter a game code")
    if (this.state.games.some(g => g.id == gameId)) {
      let name = prompt("Please enter a player name")
      fetch(`${API_ROOT}/games/${gameId}/players`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playerName: name
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
    else {
      window.alert("that game doesn't exist")
    }
  }


  render() {
    console.log(this.state)
    return (
      <div>
        <div className='lobbyButtonsContainer'>
          <button className='lobbyButton' onClick={this.handleCreateGame}>Create A New Game </button>
          <br></br>
          <button className='lobbyButton' onClick={this.handleJoinGame}>Join A Game </button>
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
