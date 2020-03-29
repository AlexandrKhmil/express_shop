import React, { Component } from 'react'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })
	
	onSubmit = (e) => {
		e.preventDefault()
	}

	render() {
		const { onChange, onSubmit } = this
		const { email, password } = this.state

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
								<button type="submit" className="btn btn-primary ml-auto">Войти</button>
							</div>
						</form> 
					</div>
				</div>
			</main>
		)
	}
}

export default Login