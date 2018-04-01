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
            {this.props.players.map( p =><div>{p.name}</div>)}
          </div>
          <div className='scores'>
            {this.props.players.map( p =><div>{p.score}</div>)}
          </div>
        </div>
      </div>


    )}
}

export default Scoreboard

// <div>SCOREBOARD</div>
