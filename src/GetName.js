import React from 'react'
// import { action } from '@storybook/addon-actions'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { API_ROOT } from './constants';

export default class ShowPrompt extends React.Component {
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
            headers: {
              'Content-Type': 'application/json'
              }
            })
          .then(res => res.json())
          .then(res => {
            this.setState({gameToEnter: res.id})
            fetch(`${API_ROOT}/games/${res.id}/players`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                playerName: result
              })
            })
            .then(res => res.json())
            .then(res => {
              sessionStorage.setItem("id", res.id)
              sessionStorage.setItem("playerName", res.playerName)
              this.props.history.push(`games/${this.state.gameToEnter}`)
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
          <Button onClick={this.showTextInput}>Text input</Button>
        </p>
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
