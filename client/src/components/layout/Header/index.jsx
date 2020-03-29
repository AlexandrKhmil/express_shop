import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-nav" aria-controls="header-nav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="container">
						<div className="collapse navbar-collapse" id="header-nav">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<NavLink className="nav-link" to='/'>Home</NavLink>
								</li>
							</ul>
							<ul className="navbar-nav ml-auto">
								<li className="nav-item active">
									<NavLink className="nav-link" to='/login'>Login</NavLink>
								</li>
							</ul>
						</div>
					</div> 
				</nav>
			</header>
		)
	}
}

export default Header