import React, { Component } from 'react';
import './App.css';
import Card from './Card.js'
import Scoreboard from './Scoreboard.js'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';

//counter, card,

class Game extends Component {
  state = {
    id: null,
    players: [],
    counter: 0,
    card: null
  }

  componentDidMount() {
    fetch(`${API_ROOT}/games/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(res => this.setState({counter: res.counter, id: res.id, players: res.players, card: res.card}))
  }

  //continually listens for new players / points, cardCounter
  handleReceiveGameUpdate = (gameUpdate) => {
    switch (gameUpdate.type){
      case 'newPlayer':
        this.setState({players: [...this.state.players, gameUpdate.payload]})
        break
      case 'readinessUpdate':
        this.setState({players: [...gameUpdate.payload]})
        break
      case 'firstTurn':
        this.setState({...this.state, counter:1, card: gameUpdate.payload})
        break
      case 'pointsUpdateAndCardTurn':
        this.setState({players:[...gameUpdate.payload.players]})
        this.setState({counter: gameUpdate.payload.counter})
        break
      case 'newCard':
        this.setState({card: gameUpdate.payload})
        break
    }
  }


  handleReady = () => {
    fetch(`${API_ROOT}/games/${this.props.match.params.id}/players/${sessionStorage.getItem("id")}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ready: true
      })
    })
  }


  showGameMain() {
    //Waiting to start game
    if (this.state.counter === 0) {
        return (
          <div className='waitingForPlayers'>
            <div>Waiting for other players to join and get ready...</div>
            {this.showReadyButton()}
            <div className='statuses'>
              {this.state.players.map( p => <li>{p.playerName} - {p.ready ? "Ready" : "Waiting"}</li>)}
            </div>
          </div>
        )
    }
    //in play
    else if (this.state.counter <= 10) {
      return (
          <Card className='card'card={this.state.card}></Card>
      )
    }
    //finished playing
    else if (this.state.counter > 10) {
      let scores = Array.from(this.state.players, x => x.score)
      let winScore = Math.max(...scores)
      let winPlayers = this.state.players.filter( p => p.score === winScore)
      return (
        <div className='GameOverWinner'>
          Game Over - winner(s):
          {winPlayers.map(wp => <li>{wp.name}</li>)}
        </div>
      )
    }
  }

  showReadyButton = () => {
    let player = this.state.players.find(p => p.id == sessionStorage.getItem("id"))
    if (player) {
      if (player.ready === false && this.state.counter === 0) {
        return (<button className='readyButton' onClick={this.handleReady}>Ready?</button>)
      }
      else {
        return (<div className='readyButton'></div>)
      }
    }
  }

  handleLeaveGame = () => {
    fetch(`${API_ROOT}/games/${this.props.match.params.id}/players/${sessionStorage.getItem('id')}`, {method: 'DESTROY'})
    this.props.history.push('/dashboard')
  }

  render() {
    console.log(this.state.card)
      return (
      <div>
        <div className='counterCardScore'>
          <div className='cardCounter'>
            <button className='quit' onClick={this.handleLeaveGame}>Leave Game</button>
            {(this.state.counter <= 10 && this.state.counter > 0) &&
           this.state.counter + "/10"}
          </div>
          <div className='gameCardContainer'>
            {this.showGameMain()}
          </div>
          <div className='scoreboardArea'>
            <Scoreboard players={this.state.players}></Scoreboard>
          </div>
        </div>
        <ActionCable
          channel={{ channel: 'GameChannel', id: this.props.match.params.id }}
          onReceived={this.handleReceiveGameUpdate}
        />
      </div>
    )
  }

}

export default Game;
