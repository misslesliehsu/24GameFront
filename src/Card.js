import React, { Component } from 'react'
import { API_ROOT } from './constants'
import { ActionCable } from 'react-actioncable-provider';


class Card extends Component {

  state = {
    numsLeft: 4,
    equation: '',
    result: null,
    winner:null
  }


  handleClick = (e) => {
    let input = e.target.innerHTML
    let nums = [this.props.card.num1, this.props.card.num2, this.props.card.num3, this.props.card.num4]
    if (nums.includes(parseInt(input))) {
      this.setState({numsLeft: this.state.numsLeft - 1})
    }
    this.setState({equation: this.state.equation + e.target.innerHTML}, () => {
      if (this.state.numsLeft === 0) {
        this.setState({result: eval(this.state.equation)}, this.handleSubmission)
      }
    })
  }

  //send through winner
  handleSubmission = () => {
    if (this.state.result === 24) {
      fetch(`${API_ROOT}/games/${this.props.card.game_id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          winnerId: sessionStorage.getItem("id")
        })
      })
    }
  }

  //continually listen for winner
  handleReceiveWinner = (card) => {
    this.setState({winner: card.winner})
  }


  turnCard = () => {
    //wipe everything out on backend too -- plus tick up cardCounter
    this.props.setCardCounter()
    this.setState({
        nums: [],
        numsLeft: 4,
        equation: '',
        result: null,
        winner:{}
    })

  }

  handleReset = () => {
    this.setState({
      ...this.state,
      numsLeft: 4,
      equation: ''
    })
  }

  showMain = () => {
    if (this.state.winner) {
      return (
        <div className='winnerNextCard'>
          Congratulations, {this.state.winner.name}
          <br></br>
          <button onClick={this.turnCard}>Next Game</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className='gameCard'>
            <div onClick={this.handleClick}>{this.props.card.num1}</div>
            <div onClick={this.handleClick}>{this.props.card.num2}</div>
            <div onClick={this.handleClick}>{this.props.card.num3}</div>
            <div onClick={this.handleClick}>{this.props.card.num4}</div>
          </div>
          <div className='operators'>
            <div className="symbol" onClick={this.handleClick}>+</div>
            <div className="symbol" onClick={this.handleClick}>-</div>
            <div className="symbol" onClick={this.handleClick}>%</div>
            <div className="symbol" onClick={this.handleClick} style={{paddingTop: '0.3em'}}>*</div>
            <div className="symbol" onClick={this.handleClick}>(</div>
            <div className="symbol" onClick={this.handleClick}>)</div>
          </div>
          <div className='reset'>
            <button onClick={this.handleReset}>Reset</button>
          </div>
          <ActionCable
            channel={{ channel: 'card', id: this.props.card.id }}
            onReceived={this.handleReceiveWinner}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='gameContainer'>
        {this.showMain()}
    </div>

    )
  }
}


export default Card
