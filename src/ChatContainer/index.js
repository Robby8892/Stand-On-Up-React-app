import React, { Component } from 'react'
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000')

export default class ChatContainer extends Component {
	constructor(){
		super()

		this.sendSocketIo = this.sendSocketIo.bind(this)
	}

	sendSocketIo() {



		socket.emit('example_message', 'My chat works!')


	}

	render(){
		return(
			<React.Fragment>
				<button onClick={this.sendSocketIo}>Send Socket.io</button>
			</React.Fragment>
		)
	}
}