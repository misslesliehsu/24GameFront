import React, { Component } from 'react'

class Card extends Component {

  state = {
    nums: [],
    counter: 4,
    equation: '',
    result: null,
    winner:null
  }

  componentDidMount() {
    //get numbers from SOMEWHERE
    this.setState({nums:[1,2,3,4], remainNums:[1,2,3,4]})
  }


  handleClick = (e) => {
    let input = e.target.innerHTML
    if (this.state.nums.includes(parseInt(input))) {
      this.setState({counter: this.state.counter - 1})
    }
    this.setState({equation: this.state.equation + e.target.innerHTML}, () => {
      if (this.state.counter === 0) {
        this.setState({result: eval(this.state.equation)}, this.handleSubmission)
      }
    })
  }

  handleSubmission = () => {
    if (this.state.result === 24) {
      //then send to backend this currentUser as winner
      this.setState({winner:this.props.user}, () => this.props.setPoints(this.calcPoints()))
    }
  }

  //continually listen for winner
  //if there is a winner, set points to backEnd
  setPoints = (pts) => {
    this.setState({user: {...this.state.user, score:this.state.user.score + pts}})
    //send results to back-end to Game
  }

  calcPoints = () => {
    let myPoints = 0
    if (this.state.winner.name === this.props.user.name) {
      myPoints = 10
    }
    return myPoints
  }

  turnCard = () => {
    //wipe everything out on backend too -- plus tick up cardCounter
    this.props.setCardCounter()
    this.setState({
        nums: [],
        counter: 4,
        equation: '',
        result: null,
        winner:{}
    })

  }

  handleReset = () => {
    this.setState({
      ...this.state,
      nums: this.state.nums,
      counter: 4,
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
            <div id="1" onClick={this.handleClick}>{this.state.nums[0]}</div>
            <div id="2" onClick={this.handleClick}>{this.state.nums[1]}</div>
            <div id="3" onClick={this.handleClick}>{this.state.nums[2]}</div>
            <div id="4" onClick={this.handleClick}>{this.state.nums[3]}</div>
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
        </div>
      )
    }
  }

  render() {
    return (
      <div className='gameContainer'>
        {this.showMain()}
        <div className='cardCounter'> {this.props.cardCounter}/10</div>
    </div>

    )
  }
}


export default Card
