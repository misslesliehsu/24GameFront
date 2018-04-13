import React from 'react'
// import all from '@storybook/addon'
import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT } from './constants';

export default class GetNameForExistingGame extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
  }

  showTextInput () {
    this.dialog.show({
      body: 'Choose your player name:',
      prompt: Dialog.TextPrompt(),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          fetch(`${API_ROOT}/games/${this.state.gameToEnter}/players`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              playerName: result
            })
          })
          .then(res => {
            if (res.status === 200) {
              res.json()
              .then(res => {
                sessionStorage.setItem("id", res.id)
                sessionStorage.setItem("playerName", res.playerName)
                this.props.history.push(`/games/${this.state.gameToEnter}`)
              })
            }
            else {
              res.json().then(document.getElementById('nameTaken').click())
            }
          })
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button id='nameForExisting' className='lobbyButton' onClick={this.showTextInput}></Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
