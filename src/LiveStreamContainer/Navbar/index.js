import React from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'



export default class Navbar extends React.Component {
    render() {
        return (



            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to={'/'} className={'navbar-brand'}>
                        Live Streams
                    </Link>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item float-right">
                                <Link className={'nav-link'} to={'/settings'}>
                                   How to Go Live
                                </Link>
                            </li>
                            <li className="nav-item float-right">
                                <a className="nav-link" href="/Logout">Logout</a>
                            </li>
                        </ul>
                    </div>


            </nav>
        )
    }
}

