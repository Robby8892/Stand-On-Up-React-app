import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LiveStreams.scss'
import config from '../../config/default'

export default class NavBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			live_streams: []
		}
	}

	componentDidMount() {
		this.getLiveStreams()
	}

	getLiveStreams() {
		axios.get('http://127.0.0.1:' + config.rtmp_server.http.port + '/api/streams')
		.then(res => {
			let streams = res.data
			if (typeof (streams['live'] !== 'undefined')) {
				this.getStreamsInfo(streams['live'])
			}
		})

	}
}