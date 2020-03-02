import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import Navbar from './Navbar/index.js'
import LiveStreams from './LiveStreams'
import Settings from './Settings'
import VideoPlayer from './VideoPlayer'

const customHistory = require('history').createBrowserHistory()

export default class Root extends Component {
	constructor(props){
		super(props)

	}

	render(){

		return(
			<Router history={customHistory}>

				<div>
					<Navbar />
					<Route 
					exact path='/' 
					render={props => (
						<LiveStreams {...props} />
						)}/>
					 <Route 
					 exact path="/stream/:username" 
					 render={(props) => (
                        <VideoPlayer {...props}/>
                    	)}/>
					 <Route 
					 exact path='/settings' 
					 render={props => (<Settings {...props} 
					 	loggedInUserEmail={this.props.loggedInUserEmail}/>
					 	)}/>

				</div>
			</Router>
	)
	}
}