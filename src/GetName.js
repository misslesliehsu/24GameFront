import React from 'react'
// import all from '@storybook/addon'
import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT, HEADERS } from './constants';

export default class GetName extends React.Component {
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
          fetch(`${API_ROOT}/games`, {
            method: 'POST',
            headers: HEADERS
            })
          .then(res => res.json())
          .then(res => {
            sessionStorage.setItem("gameToEnter", res.id)
            fetch(`${API_ROOT}/games/${res.id}/players`, {
              method: "POST",
              headers: HEADERS,
              body: JSON.stringify({
                playerName: result
              })
            })
            .then(res => res.json())
            .then(res => {
              sessionStorage.setItem("id", res.id)
              sessionStorage.setItem("playerName", res.playerName)
              this.props.history.push(`games/${sessionStorage.getItem("gameToEnter")}`)
            })
          })
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button className='lobbyButton' onClick={this.showTextInput}>Create New Game</Button>
        </p>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
