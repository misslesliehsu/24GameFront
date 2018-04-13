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
          debugger
          if (this.props.games.some(g => g.id == result)) {
            debugger
            this.setState({gameToEnter: result}, () => document.getElementById('nameForExisting').click())
          }
          else {
            document.getElementById('gameNotExist').click()
          }
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button id='nameForExisting' className='lobbyButton' onClick={this.showTextInput}>Join A Game</Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
