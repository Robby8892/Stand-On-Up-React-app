import React, { Component } from 'react'
import axios from 'axios'

export default class Navbar extends Component {
	constructor(props){
		super(props)

		this.state = {
			streamKey: ''
		}

		this.generateStreamKey = this.generateStreamKey.bind(this)
	}

	componentDidMount() {
		this.getStreamKey()
	}

	generateStreamKey = async (e) => {
	const updateStreamKeyRequest = await axios.put('http://localhost:3333/api/v1/settings/streamKey', {
			data: this.props.loggedInUserEmail
			})	
			.then(res => {
				console.log(res);
				this.setState({
					streamKey: res.data.streamKey
				})
			})
	}

	getStreamKey() {
		axios.get('http://localhost:3333/api/v1/settings/streamKey', {
			params: {
				data: this.props.loggedInUserEmail
			}}).
			then(res => {
				console.log(res.data);
				this.setState({
					streamKey: res.data.streamKey
				})
			})
	}

	render(){
		console.log(this.state);
		return(
			<React.Fragment>
				<div className='container mt-5'>
					<h4>Steaming Key</h4>
					<hr className='my-4'/>
					<div>
						<div className='col-xs-12 col-sm-12 col-md-8 col-lg-6'>
							<h5>{this.state.streamKey}</h5>
						</div>
						<div>
							<button 
							className='btn btn-dark mt-2'
							onClick={this.generateStreamKey}>
							Generate a new key
							</button>
						</div>
					</div>
				</div>
				<div className='container mt-5'>
					<h4>How to Stream</h4>
					<hr className='my-4'/>
					<div className='col-12'>
						<div className='row'>
							<p>
								You can use <a target='_blank' href='https://obsproject.com/'>OBS</a> or
								<a target='_blank' href='https://www.xsplit.com/'>Xsplit</a> to Live stream. If you're
								using OBS, go to Settings > Stream and select Custom from service dropdown. Enter
								<b>rtmp://127.0.0.1:1935/live</b> in server input field. Also, add your stream key.
								Click apply to save.

							</p>
						</div>
					</div>

				</div>
			</React.Fragment>
		)
	}
}