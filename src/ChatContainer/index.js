import React, { Component } from "react";
import axios from 'axios';
import io from "socket.io-client";

export default class ChatContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            public: Boolean
        };




        this.socket = io('localhost:8000');

        this.socket.on('RECEIVE_MESSAGE', (data) =>{
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});

        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.loggedInUserEmail,
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
        console.log('here is the comonentDidMount');
    }


    getAllMessages = async () => {

        const getAllChatsResponse = await axios.get('http://localhost:3333/api/v1/chats').then(res => {

            const messages = []
            console.log(res.data.data);
            res.data.data.forEach((chat) => {
                console.log(chat.userOwner.username);
            
            this.socket.emit('SEND_MESSAGE', {
                author: chat.userOwner.username,
                message: chat.body
            })
          })        
        })

    }

    createMessage = async (chatInfo) => {
        const newChat = await axios.post('http://localhost:3333/api/v1/chats/new', {
            data: chatInfo
        })
        .then(res => {
            console.log(res);
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
                                            <div key={index}>{message.author}: {message.message}</div>
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