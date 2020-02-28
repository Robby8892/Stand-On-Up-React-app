import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default class LoginRegister extends Component {
	constructor(pros){
		super(pros)

		this.state = {
			user: {
				username: '', 
				password: '',
				email: '',
				firstName: '',
				lastName: ''
			}
		}
	}

	handleChange = (e) => {
		console.log('Here is handleChange');
	}

	render(){
		return(
			<Segment inverted>
				<Form inverted>
					<Form.Group widths='equal'>
						<Form.Input 
						type='text' 
						name='username' 
						placeholder='Enter username'
						value={this.state.username} 
						/>
						<Form.Input 
						type='password' 
						name='password' 
						placeholder='Enter password'
						value={this.state.password} 
						/>
						<Form.Input 
						type='text' 
						name='email'
						placeholder='Enter email'
						value={this.state.email}
						/>
						<Form.Input 
						type='text'
						name='firstName' 
						placeholder='Enter first name'
						value={this.state.firstName}
						/>
						<Form.Input 
						type='text'
						name='lastName' 
						placeholder='Enter last name'
						value={this.state.lastName}
						/>
					</Form.Group>
					<Button type='submit'>Register</Button>
				</Form>
			</Segment>
	)
	}
}