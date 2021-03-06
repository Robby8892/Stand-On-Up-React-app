import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios'
import './index.scss'

export default class Navbar extends Component {
	constructor(props){
		super(props)

		this.state = {
			streamKey: '',
			copied: false
		}

		this.generateStreamKey = this.generateStreamKey.bind(this)
	}

	componentDidMount() {
		this.getStreamKey()
	}

	generateStreamKey = async (e) => {
	const updateStreamKeyRequest = await axios.put(process.env.REACT_APP_API_URL + '/settings/streamKey', {
			data: this.props.loggedInUserEmail
			})	
			.then(res => {
				this.setState({
					streamKey: res.data.streamKey
				})
			})
	}

	getStreamKey() {
		axios.get(process.env.REACT_APP_API_URL + '/settings/streamKey', {
			params: {
				data: this.props.loggedInUserEmail
			}}).
			then(res => {
				this.setState({
					streamKey: res.data.streamKey
				})
			})
	}
	onCopy = () => {
		this.setState({copied: true})
	}

	render(){
		return(
			<React.Fragment>
				<div className='container mt-5'>
					<h4>Steaming Key</h4>
					<hr className='my-4'/>
					<div>
						<div className='col-xs-12 col-sm-12 col-md-8 col-lg-6'>							
							<CopyToClipboard text={this.state.value}
					          onCopy={this.onCopy} text={this.state.streamKey}>
					          <button id='streamKey' className='btn btn-dark mt-2'>Copy to clipboard</button>
							</CopyToClipboard>
							<h2 id='st-key' className='streamKey'>{this.state.streamKey}</h2>
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
								using OBS, go to Settings > Stream and select Custom from service dropdown. Enter -      
								<b>rtmp://127.0.0.1:1935/live</b> in server input field. Also, add your stream key.
								Click apply to save.
							</p>
							<p>
								With setup configured make sure your live stream is running and then head over to <b>Live Streams</b> >>
								through your navbar and check out your video connection!
							</p>
						</div>
					</div>

				</div>
			</React.Fragment>
		)
	}
}