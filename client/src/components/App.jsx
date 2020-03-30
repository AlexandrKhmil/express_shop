import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
	positions, 
	transitions,
	Provider as AlertProvider 
} from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
import store from '../store'
import { loadUser } from '../actions/auth' 

// LAYOUT
import Header from './layout/Header'
import Footer from './layout/Footer'
import Alerts from './layout/Alerts'
import AlertTemplate from './layout/AlertTemplate'

// PAGES
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'

// ALERT OPTIONS
const alertOptions = {
	position: positions.TOP_CENTER,
	timeout: 5000,
	transition: transitions.FADE,
}

class App extends Component {
	componentDidMount() {
		if (store.getState().auth.token){
			store.dispatch(loadUser())
		} 
	}

	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Header />
						<Alerts />
						<Switch>
							<Route exact path="/" component={Home} /> 
							<Route path="/login" component={Login} /> 
							<Route path="/register" component={Register} />
							<Route path="/catalog" component={Catalog} />
						</Switch>
						<Footer />
					</Router>
				</AlertProvider>
			</Provider> 
		)
	}
}

const container = document.getElementById('root')
render(
  <App />,
  container
)