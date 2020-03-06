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
					<div id='stream' className='stream col-xs-12 col-sm-12 col-md-3 col-lg-4' key={index}>
						<span className='live-label'>Live</span>
						<Link to={'/stream/' + stream.username}>
							<div className='stream-thumbnail'>
							<img  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACbCAMAAABCvxm+AAAAY1BMVEUAAAD///8hISHR0dF6enrExMTu7u44ODhGRkbf39/39/c8PDzj4+NOTk4ODg4ICAgzMzOdnZ2EhIRmZma8vLzZ2dm1tbWtra0ZGRmWlpYuLi4oKChsbGxaWlqnp6dycnKNjY3C1UFpAAADbklEQVR4nO2X6ZaiMBBGC5GwK4Isgtv7P+VAUgE6MDg2tvac890fHYEiuWSppIkAAAAAAAAAAAAAAAAAAAAAAAAAAAD4JbhH5zMc3YdunrA+g/DgBrdf6BZt34l4ys1/GPdK8ufcdlSHimTDTxJPXutLSkLNrlJl1d6VP7xKhTQ6oulq1hdEu3CgoZ3/pNvuaAWMsNOuLb6RcmAj9HMr9iL96CKDLM6jB67DOrbSfThR3NcdWNfn3fbOeKLaTecm0W7u8DQlW5YHopPF3c5u+n2icx/euQ2sdrOKidtl/FAptb3jcHuGm1/T/cfcrIlbOjzLKVEGG4q6MjibbiKm8vVuBSt5ptthqF4QBdKpDlUGqs2YINOvT9zK77vdqODScBv1a7DhXglv0vGoKxv8t6P43i3KWrzvu23pyqXhlqsuk39j2srynHLsxO20yadu+V5GrXZLDbedjAscvqdeu1658YlbEQ574eBW/YxbomaWar1NHjKLOHL87Rk3Ow7e55bJtvyb6hVObEK2cp9xE1nXy4HhtlvnduZJbM43NbNyT/VKRV6v0a7Jr25ypnXxufjqJoqW+PtuNs/hzHBT2dbZycJPiPr5xCM1uB27R93bheHGH78691aGW8mDqTogJk41VpewDLdCL9H7jFuw3i0y9wV1dVBJ17oQ3XToMKTsVuq0mxnz7TVuUWy4NaovtmqT6jKaPjAHo8rYTS+Jy4zbmjEN2tVln1wy3NyI+6s/gejE70zdeOsVseEmTi3hmnWq+eLGy7Lmaeb0IsOm0N8qeLhzz8whKmpFfpt149ptW41kOx152xpPN+3GY+mEptvq3Dvr1s98ZtGtVh9wrd/jNjohSaolN5KNW6fmp92244uebNFNLZh04kYvdnPKski5JywhOHPcF93kggkyc0xF2XJtXucm/fQOVdU88YpFN3UQ8Ew3JejuX+zGJ57+Xxpn0a07hFhRlbzFLbS0G+fTfLPk1sgQ+jm30Sbm8EgG/VbV1rzgRqpr3f6DVroVkWTYF8qo57pVZXvCTWz5K7/QWd27jCq7i+5Ou6HlbXGixO8uRdeIzzX5kZ0867Z/GPg6nnSLwtCdJ5nnL9H/RBg95fYB4Aa3X+YWOvZncMKHbvvNp3hnSgUAAAAAAAAAAAAAAAAAAAAAAADAf8gf7XJLIVe0MAgAAAAASUVORK5CYII=' />
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

