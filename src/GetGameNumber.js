import React from 'react'
// import all from '@storybook/addon'
import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT } from './constants';

export default class GetGameNumber extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
  }

  showTextInput () {
    this.dialog.show({
      body: 'Enter game number:',
      prompt: Dialog.TextPrompt(),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          if (this.props.games.some(g => g.id == result)) {
            sessionStorage.setItem("gameToEnter", result); document.getElementById('nameForExisting').click()
          }
          else {
            document.getElementById('gameNotExist').click()
          }
        })
      ]
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <p>
          <Button id='getGameNumber' className='lobbyButton' onClick={this.showTextInput}>Join A Game</Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
