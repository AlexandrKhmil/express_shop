import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import styles from './styles.module.css'
import CartButton from '../CartButton'

class Header extends Component {
	render() {
		const { isAuth, logout } = this.props

		const guestLinks = (
			<>
				<li className="nav-item">
					<NavLink className="nav-link" to="/login">Login</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/register">Register</NavLink>
				</li>
			</>
		)

		const userLinks = (
			<>
				<li className="nav-item">
					<button className="nav-link btn btn-secondary btn-sm text-light mr-3" onClick={logout}>Logout</button>
				</li>
			</>
		)

		return (
			<header className="pt-5 mb-4">
				<nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-nav" aria-controls="header-nav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="container">
						<div className="collapse navbar-collapse" id="header-nav">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<NavLink className="nav-link" exact to='/'>Home</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" exact to='/catalog'>Catalog</NavLink>
								</li>
							</ul>
							<ul className="navbar-nav ml-auto">
								{ !isAuth ? guestLinks : userLinks}
							</ul>
						</div>
						<CartButton className={styles.cartButton} />
					</div> 
				</nav>
			</header>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
})

export default connect(
	mapStateToProps,
	{ logout }
)(Header)