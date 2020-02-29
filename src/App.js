import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import './App.css';
import LiveStreamContainer from './LiveStreamContainer/root.js'
import LoginRegister from './LoginRegister'
import axios from 'axios';

export default class App extends Component {
	constructor(){
		super()

		this.state = {
			openChat: false,
      loggedIn: false,
      loggedInUserId: '',
      loggedInUserEmail: '',
      status: 'login',
      message: '' 
		}
	}

	changeChatStatus = () => {
		this.setState({
			openChat: !this.state.openChat
		})

	}

  registerUser = async (registerInfo) => {
    try{
    const registerResponse = await axios.post('http://localhost:3333/api/v1/auth/register', {
      'data': registerInfo 
    })
    .then(res => {

      if(res.data.status === 201){
        this.setState({
          status: 'login'
        })
      } else {
        this.setState({
          message: 'Username or email is already taken'
        })
      }
    })


  }catch(err){
    console.log(err, 'error for registerUser__________');
  }


  }

  loginUser = async (loginInfo) => {
    try {
      console.log(loginInfo);
      const loginResponse = await axios.post('http://localhost:3333/api/v1/auth/login', {
        data: loginInfo
      })
      .then(res => {
        console.log(res.data);
        if(res.data.status === 200){
          this.setState({
            loggedIn: true,
            loggedInUserId: res.data.userId,
            loggedInUserEmail: res.data.email
          })
        } else {
          this.setState({message: 'Invalid login credentials'})
        }
      })

    }catch(err){
      console.log(err);
    }
  }


  changeStatus = () => {

    if(this.state.status === 'register') {
    this.setState({status: 'login', message: ''})
    } else {
      this.setState({status: 'register', message: ''})
    }
  }
	render(){
    console.log(this.state);
  return (
    <div className="App">
      <p className='message'>{this.state.message}</p>
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
      registerUser={this.registerUser}
      loginUser={this.loginUser}
      />
    </div>
  );
}
}

