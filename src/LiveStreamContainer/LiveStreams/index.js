import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LiveStreams.scss'
import config from '../../config/default'


export default class Navbar extends Component {
	constructor(props){
		super(props)

		this.state = {
			live_streams: [{data: []}],
			streamOn: false
		}
	}

	componentDidMount() {

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
		axios.get(process.env.REACT_APP_API_URL + '/streams/info', {
			params: {
				streams: live_streams
			}})
		.then(res => {
				console.log(res.data);
			this.setState({
				live_streams: res.data,
				streamOn: true
			}, () => {
				
			})
		})
	}

	createStreams = () => {
		console.log('hello from createStreams');
			let	streams = this.state.live_streams.data.map((stream, index)=>{
				console.log('here is are my streams', stream);
				return (				
					<div className='stream col-xs-12 col-sm-12 col-md-3 col-lg-4' key={index}>
						<span className='live-label'>Live</span>
						<Link to={'/stream/' + stream.username}>
							<div className='stream-thumbnail'>
							<img src={'/server/thumbnails/' + stream.streamKey + '.png'}/>
							</div>
						</Link>

						<span className='username'>
							<Link to={'/stream/' + stream.username}>
							{stream.username}
							</Link>
						</span>
					</div>
				)
		})
			
			return streams	
	}


	render(){
		return(
			<div className="container mt-5">
                <h4>Live Streams</h4>
                <hr className="my-4"/>
                
                <div className="streams row">
                	{this.state.streamOn === false ? null : this.createStreams()}


                </div>
            </div>
		)
	}
}

