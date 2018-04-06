import React, { Component } from 'react'

class Scoreboard extends Component {
  state = {
    players: []
  }


  render() {
    return (
      <div>
        <div className='scoreboard'>
          <div className='names'>
            {this.props.players.map( p =><div key={p.id}>{p.playerName}</div>)}
          </div>
          <div className='points'>
            {this.props.players.map( p =><div key={p.id}>{p.points}</div>)}
          </div>
        </div>
      </div>


    )}
}

export default Scoreboard

// <div>SCOREBOARD</div>
