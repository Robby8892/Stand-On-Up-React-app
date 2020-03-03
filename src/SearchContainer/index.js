import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const source = _.times(1, () => ({
  	username: [],
  	email: []
}))				



export default class SearchContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			isLoading: false,
			results: [],
			value: '',
			source: []
		}
	}


	handleResultSelect = (e, { result }) => {
	  	this.setState({ value: result.title })
	  	}

    handleSearchChange = (e, { value }) => {
			this.setState({ isLoading: true, value }) 

			setTimeout(() => {
      		if (this.state.value.length < 1) return this.setState(this.state)

		      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
		      const isMatch = (result) => {   re.test(result) }

		      this.setState({
		        isLoading: false,
		        results: _.filter(this.state.source, isMatch),
		      })
    }, 300)
  }
   		
  	componentDidMount(){
  		this.getUsers()
  	}


	getUsers = async () => {

		const allUsersResponse = await axios.get('http://localhost:3333/api/v1/allUsers'
			).then(res => {

				if(res.data.status === 200){
					
					this.setState({source: res.data.data})

				}
			})
	}

	render(){
		const { isLoading, value, results } = this.state

		return(
		<Grid>
        	<Grid.Column width={6}>
          		<Search
            		loading={isLoading}
            		onResultSelect={this.handleResultSelect}
            		onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}

          />
        	</Grid.Column>
        	<Grid.Column width={10}>
          		<Segment>
            	<Header>State</Header>
            	<pre style={{ overflowX: 'auto' }}>
              		isLoading:{JSON.stringify(this.state, null, 2)}
            	</pre>
            	<Header>Options</Header>
            	<pre style={{ overflowX: 'auto' }}>
            	  	{JSON.stringify(this.state.source, null, 2)}
            	</pre>
          		</Segment>
        	</Grid.Column>
      </Grid>	
      )
	}

}
