import React, { Component } from 'react'
import { Form, Button, Label, Header, Modal, Segment } from 'semantic-ui-react'
import './index.scss'

export default class LoginRegister extends Component {
	constructor(props){
		super(props)

		this.state = {
				username: '', 
				password: '',
				email: '',
				firstName: '',
				lastName: ''
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	loginRegister = () => {
		if(this.props.status === 'register') {
			this.props.registerUser(this.state)
		} else {
			this.props.loginUser(this.state)
		}
	}

	onSubmit = (e) => {

		e.preventDefault()

		this.loginRegister()
	}

	changeStatus = () => {
		this.setState({
			username: '', 
			password: '',
			email: '',
			firstName: '',
			lastName: ''
		})
		this.props.changeStatus()
	}

	render(){

		return(
			<Modal size={'mini'} open={this.props.openLogRegModal} closeIcon onClose={this.props.closeLogRegModal}>
				<Modal.Content>
					{this.props.status === 'register' ? <span className='reg-log-status'>Register</span> : <span className='reg-log-status'>Login</span>  }
					<Form className='log-reg-container' onSubmit={this.onSubmit}>
							{ this.props.status === 'register' ? 
							<>
							<Label className="ui primary button">Username:</Label>
							<Form.Input 
							type='text' 
							name='username'
							value={this.state.username}
							onChange={this.onChange}
							placeholder='Enter username'
							required minLength='1' 
							/>
							</>
							:
							<>
							<Label className="ui primary button">Username or Email:</Label>
							<Form.Input 
							type='text' 
							name='username' 
							value={this.state.username}
							onChange={this.onChange} 
							placeholder='Enter username or email'
							required minLength='1' 
							/>
							</>

							}
							<Label className="ui primary button">Password:</Label>
							<Form.Input 
							type='password' 
							name='password' 
							placeholder='Enter password'
							value={this.state.password}
							onChange={this.onChange}
							required minLength='8' 
							/>
							{this.props.status === 'register' ?
							
								<>
								<Label className="ui primary button">Email:</Label>
								<Form.Input 
								type='email' 
								name='email'
								placeholder='Enter email'
								value={this.state.email}
								onChange={this.onChange}
								required minLength='1'
								/>
								<Label className="ui primary button">First Name:</Label>
								<Form.Input 
								type='text'
								name='firstName' 
								placeholder='Enter first name'
								value={this.state.firstName}
								onChange={this.onChange}
								required minLength='1'
								/>
								<Label className="ui primary button">Last Name:</Label>
								<Form.Input 
								type='text'
								name='lastName' 
								placeholder='Enter last name'
								value={this.state.lastName}
								onChange={this.onChange}
								required minLength='1'
								/>
								</>
								: 
								null
								}
						
						<Modal.Actions>
							<Button className="ui primary button" type='submit'>{this.props.status === 'register' ? 'Register' : 'Login'}</Button>
						</Modal.Actions>
					</Form>
				</Modal.Content>
				{this.props.status === 'register' ? 
				<small>Already signed up? Click <span onClick={this.changeStatus} className='switch-form'>here</span>.</small>
				:
				<small>Need to register? Click <span onClick={this.changeStatus} className='switch-form'>here</span>.</small>
			}
			</Modal>
	)
	}
}