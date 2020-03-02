import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LiveStreams.scss'
import config from '../../config/default'


export default class Navbar extends Component {
	constructor(props){
		super(props)

		this.state = {
			live_streams: [],
			runStream: false
		}

		this.getLiveStreams()
	}


	getLiveStreams() {
		
		axios.get('http://127.0.0.1:' + config.rtmp_server.http.port + '/api/streams')
		.then(res => {
			let streams = res.data

			if (typeof(streams['live'] != undefined)) {
				this.getStreamInfo(streams['live'])
			}
			else {
				console.log('error _______________');
			}
		})
	}

	getStreamInfo(live_streams) {
		console.log('getStreamInfo >>>> ');
		axios.get('http://localhost:3333/api/v1/streams/info', {
			params: {
				streams: live_streams
			}})
		.then(res => {
			this.setState({
				live_streams: res.data,
				runStream: true
			}, () => {
				console.log(this.state);
			})
		})
	}

	render(){
		let streams = ''
		console.log(this.state.live_streams.data);
		if(this.state.runStream === true) {
		streams = this.state.live_streams.data.map(({_id, username, streamKey })=>{
			return (
				<div className='stream col-xs-12 col-sm-12 col-md-3 col-lg-4' key={_id}>
					<span className='live-label'>Live</span>
					<Link to={'/stream/' + username}>
						<div className='stream-thumbnail'>
						<img src={'/thumbnails/' + streamKey + '.png'}/>
						</div>
					</Link>

					<span className='username'>
						<Link to={'/stream/' + username}>
						{username}
						</Link>
					</span>
				</div>
			)
		})
		}
		return(
			<div className="container mt-5">
                <h4>Live Streams</h4>
                <hr className="my-4"/>
 
                <div className="streams row">
                	{this.state.runStream === true ? streams : null}
                </div>
            </div>
		)
	}
}

