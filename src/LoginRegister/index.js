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

	render(){
		console.log(this.state);
		return(
			<Segment inverted>
				<Form inverted>
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
					<Button type='submit'>Register</Button>
				</Form>
			</Segment>
	)
	}
}