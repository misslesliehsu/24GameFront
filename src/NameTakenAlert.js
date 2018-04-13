import React from 'react'
// import all from '@storybook/addon'
import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT } from './constants';

export default class NameTakenAlert extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
  }

  showTextInput () {
    this.dialog.show({
      body: 'Somebody in the game already has that name! Try again.',
      actions: [
        Dialog.OKAction(() => {
          document.getElementById('nameForExisting').click()
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button className='lobbyButton' id='nameTaken' onClick={this.showTextInput}></Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
