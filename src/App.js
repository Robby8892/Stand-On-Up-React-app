import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import './App.css';
import LiveStreamContainer from './LiveStreamContainer/root.js'
import LoginRegister from './LoginRegister'
import SearchContainer from './SearchContainer'
import axios from 'axios';


export default class App extends Component {
	constructor(){
		super()

		this.state = {
			openChat: false,
      videoMenu: false,
      loggedIn: false,
      loggedInUserId: '',
      loggedInUserEmail: '',
      status: 'login',
      message: '',
		}
	}

	changeChatStatus = () => {
		this.setState({
			openChat: !this.state.openChat
		})

	}

  registerUser = async (registerInfo) => {
    try{
    const registerResponse = await axios.post(process.env.REACT_APP_API_URL + '/auth/register', {
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
      const loginResponse = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', {
        data: loginInfo
      })
      .then(res => {
        if(res.data.status === 200){
          this.setState({
            loggedIn: true,
            loggedInUserId: res.data.userId,
            loggedInUserEmail: res.data.email,
            videoMenu: true
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

  globalChat = () => {
    this.setState({openChat: !this.state.openChat})
  }

	render(){


  return (
    <div className="App">
      <p className='message'>{this.state.message}</p>
      {this.state.loggedIn === false ? 
        null :
        <a onClick={this.globalChat} href='#'>{this.state.openChat === false ? 'Open Chat' : 'Close Chat'}</a>    
      }

      {this.state.openChat === false ?
      	null 
      	:
      	<ChatContainer
        loggedInUserId={this.state.loggedInUserId}
        loggedInUserEmail={this.state.loggedInUserEmail}
        />
      }

      {this.state.videoMenu === false ?
        null 
        :
        <LiveStreamContainer
        loggedInUserEmail={this.state.loggedInUserEmail}
        />
      }

      {this.state.loggedIn === false ? 
        <LoginRegister 
        status={this.state.status}
        changeStatus={this.changeStatus}
        registerUser={this.registerUser}
        loginUser={this.loginUser}
        />
        :
        null
      }
    </div>
  );
}
}

