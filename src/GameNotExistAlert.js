import React from 'react'
// import all from '@storybook/addon'
import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT } from './constants';

export default class GameNotExistAlert extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
  }

  showTextInput () {
    this.dialog.showAlert({
      body: 'No game with that id! Try again.'
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button id='gameNotExist' className='lobbyButton' onClick={this.showTextInput}></Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
