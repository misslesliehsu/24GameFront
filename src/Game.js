import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card.js'
import Scoreboard from './Scoreboard.js'
import { ActionCable } from 'react-actioncable-provider';

class Game extends Component {
  state = {
    players: [{name:"Leslie", score:0}, {name:"Lisa", score:10},{name:"Tom", score:5}],
    cardCounter: 0
  }

  //continually listens for new players / points, cardCounter

  //triggered when someone clicks the "start game" or when new tick is received
  setCardCounter = () => {
    this.setState({cardCounter: this.state.cardCounter+1})
  }

  //turn to game mode

  //tick up cards

  //quit playing

  //

  //if counter is at 10; get the

  handleReceiveGameUpdate = (gameUpdate) => {
    console.log(gameUpdate)
  }

  showGameMain() {
    if (this.state.cardCounter === 0) {
        return (
          <div>waiting
            <button onClick={this.setCardCounter}>Start Game!</button>
          </div>
        )
    }
    else if (this.state.cardCounter <= 10) {
      return (
        <div className='main'>
          <Card user={this.state.user} setPoints={this.setPoints} cardCounter={this.state.cardCounter}></Card>
          <Scoreboard players={this.state.players}></Scoreboard>
        </div>
      )
    }
    else if (this.state.cardCounter > 10) {
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

  render() {
    return (
      <div className="App">
          {this.showGameMain()}

          <ActionCable
            channel={{ channel: 'GameChannel', id: this.props.match.params.id }}
            onReceived={this.handleReceiveGameUpdate}
          />
      </div>
    )
  }

}

export default Game;
