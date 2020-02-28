import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

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

	}

	onSubmit = (e) => {

		e.preventDefault()

		this.loginRegister()
	}

	changeStatus = () => {
		console.log('hello');
		this.props.changeStatus()
	}

	render(){
		console.log(this.state);
		return(
			<Segment inverted>
			{this.props.status === 'register' ? 'Register Here' : 'Login Here' }
				<Form inverted onSubmit={this.onSubmit}>
					<Form.Group widths='equal'>
						<Form.Input 
						type='text' 
						name='username' 
						placeholder='Enter username'
						value={this.state.username}
						onChange={this.onChange} 
						/>
						<Form.Input 
						type='password' 
						name='password' 
						placeholder='Enter password'
						value={this.state.password}
						onChange={this.onChange} 
						/>
						{this.props.status === 'register' ?
						<Segment inverted> 
						<Form.Group widths='equal'>
							<Form.Input 
							type='text' 
							name='email'
							placeholder='Enter email'
							value={this.state.email}
							onChange={this.onChange}
							/>
							<Form.Input 
							type='text'
							name='firstName' 
							placeholder='Enter first name'
							value={this.state.firstName}
							onChange={this.onChange}
							/>
							<Form.Input 
							type='text'
							name='lastName' 
							placeholder='Enter last name'
							value={this.state.lastName}
							onChange={this.onChange}
							/>
						</Form.Group>
						</Segment> 
						: 
						null
						}
					</Form.Group>
					<Button type='submit'>Register</Button>
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