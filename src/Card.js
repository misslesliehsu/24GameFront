import React, { Component } from 'react'
import { API_ROOT } from './constants'
import { ActionCable } from 'react-actioncable-provider';


class Card extends Component {

  state = {
    numsLeft: 4,
    equation: '',
    result: null,
    winner:null,
    showWrong: 'hidden'
  }

  componentDidMount() {
    this.setState({winner: this.props.card.winnerId})
  }

  handleClick = (e) => {
    let input = e.target.id
    let nums = [this.props.card.num1, this.props.card.num2, this.props.card.num3, this.props.card.num4]
    //are these two numbers in a row? 'wrong'
    if (nums.includes(parseInt(this.state.equation.slice(-1))) && nums.includes(parseInt(input))) {
      this.setState({showWrong: 'visible'})
      setTimeout( () => this.setState({showWrong: 'hidden'}), 1000)
      this.handleReset()
      return false
    }
    //is this a number?  (versus a symbol) if so make note
    if (nums.includes(parseInt(e.target.id))) {
      this.setState({numsLeft: this.state.numsLeft - 1})
    }

    //append to equation to be evaluated
    this.setState({equation: this.state.equation + e.target.id}, () => {
      if (this.state.numsLeft === 0) {
        //if player used all numbers but still has a hanging ")" - wait for it; if that's the case and now the input is anything other than ")", then 'wrong'
        if (!this.countingParens()) {
          if (!nums.includes(parseInt(input)) && input != (")")) {
            this.setState({showWrong: 'visible'})
            setTimeout( () => this.setState({showWrong: 'hidden'}), 1000)
            this.handleReset()
          }
        }
        //otherwise if used all numbers - time to evaluate. may throw errors - in which case 'wrong'
        else {
          //if no errors - set this to state's result -- then submit to backend
          try {
            eval(this.state.equation)
            if (eval(this.state.equation) == 24) {
              // this.setState({winner: sessionStorage.getItem("playerName")})
              this.handleSubmission()
            }
            else {
              this.setState({showWrong: 'visible'})
              setTimeout( () => this.setState({showWrong: 'hidden'}), 1000)
              this.handleReset()
            }
          }
          catch(e) {
            this.setState({showWrong: 'visible'})
            setTimeout( () => this.setState({showWrong: 'hidden'}), 1000)
            this.handleReset()
          }
        }
      }
    })
  }

  countingParens = () => {
    let count1 = 0
    let count2 = 0
    this.state.equation.split("").forEach( char =>  {
      if (char == "(") {
        count1++
      }
      else if (char == ")") {
        count2++
      }
    })
    return count1 === count2
  }


  handleNextCard = () => {
    this.setState({winner: ''})
    fetch(`${API_ROOT}/games/${this.props.card.game_id}/players/${sessionStorage.getItem("id")}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ready: true
      })
    })
  }

  //send through winner
  handleSubmission = () => {
    fetch(`${API_ROOT}/games/${this.props.card.game_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        winnerId: sessionStorage.getItem("id")
      })
    })
    this.handleReset()
  }

  //continually listen for winner
  handleReceiveWinner = (winner) => {
    this.setState({winner: winner})
    this.handleReset()
  }

  handleReset = () => {
    this.setState({
      numsLeft: 4,
      equation: '',
      result: null
    })
  }

  showMain = () => {
    if (this.state.winner) {
      return (
        <div className='gameCard'>
          <div className='winnerNextCard'>
            {this.state.winner.playerName && "Congratulations," + this.state.winner.playerName}
            <br></br>
            <button className='nextCard' onClick={this.handleNextCard}>Next Card</button>
            <div className='statuses'>
              {this.props.players.map( p => <li>{p.playerName} - {p.ready ? "Ready" : "Waiting"}</li>)}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='gameCard'>
          <div className='numbersGrid'>
            <div id={this.props.card.num1} onClick={this.handleClick}>{this.props.card.num1}</div>
            <div id={this.props.card.num2} onClick={this.handleClick}>{this.props.card.num2}</div>
            <div id={this.props.card.num3} onClick={this.handleClick}>{this.props.card.num3}</div>
            <div id={this.props.card.num4} onClick={this.handleClick}>{this.props.card.num4}</div>
            <p className='equation'>{this.state.equation}</p>
            <button className='reset' onClick={this.handleReset}>Reset formula</button>
            <div style={{visibility: this.state.showWrong}} className='wrongAnswer'>X</div>
        </div>
          <div className='operators'>
            <div className="symbol" id="+" onClick={this.handleClick}>+</div>
            <div className="symbol" id="-" onClick={this.handleClick}>-</div>
            <div className="symbol" id="/" onClick={this.handleClick}>%</div>
            <div className="symbol" id="*" onClick={this.handleClick}>*</div>
            <div className="symbol" id="(" onClick={this.handleClick}>(</div>
            <div className="symbol" id=")" onClick={this.handleClick}>)</div>
        </div>
          <ActionCable
            channel={{ channel: 'CardChannel', id: this.props.card.id }}
            onReceived={this.handleReceiveWinner}
          />
        </div>
      )
    }
  }

  render() {
    console.log(this.state)
    return (
        this.showMain()
    )
  }
}


export default Card
