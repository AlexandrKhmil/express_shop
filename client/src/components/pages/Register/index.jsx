import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux' 
import { register } from '../../../actions/auth'

class Register extends Component {
	state = {
		email: '',
		password: '',
		password2: ''
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })
	
	onSubmit = (e) => {
		e.preventDefault()
		const { register } = this.props
		const { email, password } = this.state
		register(email, password)
	}

	render() {
		const { onChange, onSubmit } = this
		const { email, password, password2 } = this.state
		const { isAuth } = this.props

		if (isAuth) {
			return <Redirect to="/" />
		}

		return (
			<main>
				<div className="col-md-6 m-auto">
					<div className="card mt-5">
						<h4 className="card-header">Регистрация</h4>
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
								<label htmlFor="password">Confirm Password</label>
								<input 
									type="password"
									className="form-control"
									name="password2"
									onChange={onChange}
									value={password2}
								/>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-primary ml-auto">Регистрация</button>
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
	{ register }
)(Register)