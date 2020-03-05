import React from 'react'

export default function AboutContainer(props) {

	return(
		<React.Fragment>
			Developer: Roberto G, Cortes
			<p>
			As a developer I seek to build and work on projects that 
			challenege my knowledge and put me mind to work. Reasearch is 100%
			the name of the game and I have built a live streaming stand up comedy app
			with global chatting for any user that logs in and regiseters! 
			</p>

			<small>
			Feel free to connect with me on <a target="_blank" href='https://www.linkedin.com/in/roberto-g-cortes/'>linkedin</a>
			</small>
			<small>
				<p className='about' onClick={props.openAbout}>Close</p>
			</small>
			<br/>
		</React.Fragment>
		)
}