import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import './App.css';

export default class App extends Component {
	constructor(){
		super()

		this.state = {
			openChat: false 
		}
	}

	chantChatStatus = () => {
		this.setState({
			openChat: !this.state.openChat
		})
	}

	render(){
		console.log(this.state.openChat);
  return (
    <div className="App">
    	<nav>
    		<ul>
    			<a onClick={this.chantChatStatus} href='#' >Open chat</a>	
    		</ul>
    	</nav>
      {this.state.openChat === false ?
      	null 
      	:
      	<ChatContainer/>
      }
    </div>
  );
}
}

