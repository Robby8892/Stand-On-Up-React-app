import React, { Component } from "react";
import axios from 'axios';
import io from "socket.io-client";
import './index.css'
const moment = require('moment')

export default class ChatContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            createOn: '',
            messages: [],
            public: Boolean
        };




        this.socket = io('localhost:8000');

        this.socket.on('RECEIVE_MESSAGE', (data) =>{
            addMessage(data);
        });

        const addMessage = data => {
           
            this.setState({messages: [...this.state.messages, data]});

        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                username: this.props.loggedInUserEmail,
                message: this.state.message
            })

            const userChat = {
                body: this.state.message,
                userOwner: this.props.loggedInUserId,
                public: true 
            }

            this.createMessage(userChat)
            this.setState({message: ''});

        }
    }
    componentDidMount() {
        this.getAllMessages()

    }


    getAllMessages = async () => {

        const getAllChatsResponse = await axios.get('http://localhost:3333/api/v1/chats').then(res => {
            console.log(res.data.data);    
            res.data.data.forEach((chat) => {
            
            this.socket.emit('SEND_MESSAGE', {
                username: chat.userOwner.username,
                message: chat.body,
                createdOn: chat.createdOn
            })
          })        
        })

    }

    createMessage = async (chatInfo) => {
        const newChat = await axios.post('http://localhost:3333/api/v1/chats/new', {
            data: chatInfo
        })
        .then(res => {

        })
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">

                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map((message, index) => {
                                        return (
                                            <div className='each-msg' key={index}>{message.username}: {message.message} - Posted on: {message.createdOn}{}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input 
                                type="text" 
                                placeholder="Username" 
                                value={this.props.loggedInUserEmail} 
                                onChange={ev => this.setState({username: ev.target.value})} 
                                className="form-control"/>
                                <br/>
                                <input 
                                type="text" 
                                placeholder="Message" 
                                className="form-control" 
                                value={this.state.message} 
                                onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button 
                                onClick={this.sendMessage} className="btn btn-primary form-control">Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}