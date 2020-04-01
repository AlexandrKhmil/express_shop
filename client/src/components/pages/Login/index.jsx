import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux' 
import { login } from '../../../actions/auth'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })
	
	onSubmit = (e) => {
		e.preventDefault()
		const { login } = this.props
		const { email, password } = this.state
		login(email, password)
	}

	render() {
		const { onChange, onSubmit } = this
		const { email, password } = this.state
		const { isAuth } = this.props

		if (isAuth) {
			return <Redirect to="/" />
		}

		return (
			<main>
				<div className="col-md-6 m-auto">
					<div className="card mt-5">
						<h4 className="card-header">Авторизация</h4>
						<form className="card-body" onSubmit={onSubmit}>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input 
									type="email"
									className="form-control"
									name="email"
									onChange={onChange}
									value={email}
								/> 
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input 
									type="password"
									className="form-control"
									name="password"
									onChange={onChange}
									value={password}
								/>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-primary">Войти</button>
							</div>
						</form> 
					</div>
				</div>
			</main>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
})

export default connect(
	mapStateToProps,
	{ login }
)(Login)