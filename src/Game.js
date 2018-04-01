import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card.js'
import Scoreboard from './Scoreboard.js'


class Game extends Component {
  state = {
    players: [{name:"Leslie", score:0}, {name:"Lisa", score:10},{name:"Tom", score:5}],
    cardCounter: 0
  }

  //continually listens for new players / points, cardCounter


  setCardCounter = () => {
    this.setState({cardCounter: this.state.cardCounter+1})
  }

  //turn to game mode

  //tick up cards

  //quit playing

  //

  //if counter is at 10; get the

  showGameMain() {
    switch (this.state.cardCounter) {
      case 0:
        return (
          <Lobby></Lobby>
        )
      case < 10 && > 10:
        return (
          <div className='main'>
            <Card user={this.state.user} setPoints={this.setPoints} cardCounter={this.state.cardCounter}></Card>
            <Scoreboard players={this.state.players}></Scoreboard>
          </div>

        )
      case > 10:
        //can update this to have more
        let scores = Array.from(this.state.players, x => x.score)
        let winScore = Math.max(...scores)
        let winPlayers = this.state.players.filter( p => p.score === winScore)
        return (
          <div>Game Over - winner(s): {winPlayers.map(wP => <li>{wp.name}</div>)}</li>
        )
    }
  }

  render() {
    return (
      <div className="App">
          {this.showGameMain()}
      </div>
    );
  }
}

export default Game;
