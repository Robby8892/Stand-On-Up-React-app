import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import './App.css';
import LiveStreamContainer from './LiveStreamContainer/root.js'
import LoginRegister from './LoginRegister'

export default class App extends Component {
	constructor(){
		super()

		this.state = {
			openChat: false,
      loggedIn: false,
      loggedInUserId: '',
      loggedInUserEmail: '',
      status: 'register' 
		}
	}

	changeChatStatus = () => {
		this.setState({
			openChat: !this.state.openChat
		})

	}


  changeStatus = () => {

    if(this.state.status === 'register') {
    this.setState({status: 'login'})
    } else {
      this.setState({status: 'register'})
    }
  }
	render(){

  return (
    <div className="App">
    	<nav>
    		<ul>
    			<a onClick={this.changeChatStatus} href='#' >{this.state.openChat === false ? 'Open' : 'Close'} chat</a>	
    		</ul>
    	</nav>
      {this.state.openChat === false ?
      	null 
      	:
      	<ChatContainer/>
      }

      {this.state.loggedIn === false ?
        null 
        :
        <LiveStreamContainer/>
      }

      <LoginRegister 
      status={this.state.status}
      changeStatus={this.changeStatus}
      />
    </div>
  );
}
}

