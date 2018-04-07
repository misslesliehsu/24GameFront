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
          <div>waiting
          </div>
        )
    }
    //in play
    else if (this.state.counter <= 10) {
      return (
        <div className='main'>
          <div className='cardCounter'> {this.state.counter}/10</div>
          <Card card={this.state.card}></Card>
        </div>
      )
    }
    //finished playing
    else if (this.state.counter > 10) {
      let scores = Array.from(this.state.players, x => x.score)
      let winScore = Math.max(...scores)
      let winPlayers = this.state.players.filter( p => p.score === winScore)
      return (
        <div>
          Game Over - winner(s):
          {winPlayers.map(wp => <li>{wp.name}</li>)}
        </div>
      )
    }
  }

  showButton = () => {
    let player = this.state.players.find(p => p.id == sessionStorage.getItem("id"))
    if (player) {
      if (player.ready === false && this.state.counter === 0) {
        return (<button onClick={this.handleReady}>Ready?</button>)
      }
    }
  }



  render() {
    console.log(this.state)
      return (
      <div className='gamePage'>
          {this.showButton()}
          {this.showGameMain()}
          <Scoreboard players={this.state.players}></Scoreboard>
          <ActionCable
            channel={{ channel: 'GameChannel', id: this.props.match.params.id }}
            onReceived={this.handleReceiveGameUpdate}
          />
      </div>
    )
  }

}

export default Game;
