import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import './App.css';
import LiveStreamContainer from './LiveStreamContainer/root.js'
import LoginRegister from './LoginRegister'
import SearchContainer from './SearchContainer'
import AboutContainer from './AboutContainer'
import axios from 'axios';
import { Header, Segment } from 'semantic-ui-react'



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
      aboutOpen: false,
      openLogRegModal: false
		}
	}

  openAbout = () => {
    this.setState({aboutOpen: !this.state.aboutOpen})
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
            videoMenu: true,
            openLogRegModal: false,
            message: ''
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

  openLogRegModal = () => {
    this.setState({openLogRegModal: true})
  }

  closeLogRegModal = () => {
    this.setState({openLogRegModal: false, status: 'login'}) 
  }

	render(){

  return (
    <div className="App">
     <Header as='h2' attached='top'>
      {this.state.loggedIn === false ? 'Welcome to Stand-On-Up, the app!' : `Logged in as ${this.state.loggedInUserEmail}`}
    </Header>
    <Segment attached>
        {this.state.loggedIn === false ? 
        null :
        <button className="ui secondary button" onClick={this.globalChat}>{this.state.openChat === false ? 'Open Global Chat' : 'Close Chat'}</button>    
        }
        {this.state.loggedIn === false && this.state.aboutOpen === false ? <p>Stand up comedy for where you stand.</p> : null}
        {this.state.loggedIn === false && this.state.aboutOpen === false ? <span onClick={this.openAbout} className='about'>About me</span> : null}
        {this.state.loggedIn === false && this.state.aboutOpen === true ? <AboutContainer openAbout={this.openAbout}/> : null}
    </Segment>
    {this.state.loggedIn === false ? <button onClick={this.openLogRegModal} className="btn btn-outline-success">Login</button> : null}
      <p className='message'>{this.state.message}</p>
 


      
        <LoginRegister 
        openLogRegModal={this.changeLogRegModal}
        closeLogRegModal={this.closeLogRegModal}
        openLogRegModal={this.state.openLogRegModal}
        status={this.state.status}
        changeStatus={this.changeStatus}
        registerUser={this.registerUser}
        loginUser={this.loginUser}
        />
        

      {this.state.loggedIn === true ? null :

        <>
        <img 
        className='myLogo' 
        src='https://wixmp-fe53c9ff592a4da924211f23.wixmp.com/fulfillments/20ae19c1-c308-4148-972d-73b086d61440/preview_id/Preview.jpg'
        alt='Logo for Stand On Up, a hand raised, snap fingers up'
        />
        <img 
        className='mic'
        src='data:image/jpeg;base64,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'
        alt='An image of a mic'
        />

        </>
      }

      {this.state.videoMenu === false ?
        null 
        :
        <LiveStreamContainer
        loggedInUserEmail={this.state.loggedInUserEmail}
        />
      }

      {this.state.openChat === false ?
        null 
        :
        <ChatContainer
        changeChatStatus={this.changeChatStatus}
        loggedInUserId={this.state.loggedInUserId}
        loggedInUserEmail={this.state.loggedInUserEmail}
        />
      }


    </div>
  );
}
}

