import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import './index.scss'

export default class LoginRegister extends Component {
	constructor(pros){
		super(pros)

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
			<Segment inverted>
			{this.props.status === 'register' ? 'Register Here' : 'Login Here' }
				<Form className='log-reg-container' inverted onSubmit={this.onSubmit}>
					<Form.Group widths='equal'>
						{ this.props.status === 'register' ? <Form.Input 
						type='text' 
						name='username'
						value={this.state.username}
						onChange={this.onChange}
						placeholder='Enter username'
						required minLength='1' 
						/>
						:
						<Form.Input 
						type='text' 
						name='username' 
						value={this.state.username}
						onChange={this.onChange} 
						placeholder='Enter username or email'
						required minLength='1' 
						/>

						}
						<Form.Input 
						type='password' 
						name='password' 
						placeholder='Enter password'
						value={this.state.password}
						onChange={this.onChange}
						required minLength='8' 
						/>
						{this.props.status === 'register' ?
						
						<Form.Group widths='equal'>
							<Form.Input 
							type='email' 
							name='email'
							placeholder='Enter email'
							value={this.state.email}
							onChange={this.onChange}
							required minLength='1'
							/>
							<Form.Input 
							type='text'
							name='firstName' 
							placeholder='Enter first name'
							value={this.state.firstName}
							onChange={this.onChange}
							required minLength='1'
							/>
							<Form.Input 
							type='text'
							name='lastName' 
							placeholder='Enter last name'
							value={this.state.lastName}
							onChange={this.onChange}
							required minLength='1'
							/>
						</Form.Group>

						: 
						null
						}
					</Form.Group>
					<Button type='submit'>{this.props.status === 'register' ? 'Register' : 'Login'}</Button>
				</Form>
				{this.props.status === 'register' ? 
				<small>Already signed up? Click <span onClick={this.changeStatus} className='switch-form'>here</span>.</small>
				:
				<small>Need to register? Click <span onClick={this.changeStatus} className='switch-form'>here</span>.</small>
			}
			</Segment>
	)
	}
}