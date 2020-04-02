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

// ACTIONS
import { loadUser } from '../actions/auth' 
import { loadProducts } from '../actions/product'

// LAYOUT
import Header from './layout/Header'
import Footer from './layout/Footer'
import Alerts from './layout/Alerts'
import AlertTemplate from './layout/AlertTemplate'
import Cart from './layout/Cart'

// PAGES
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import User from './pages/User'

// ALERT OPTIONS
const alertOptions = {
	position: positions.TOP_CENTER,
	timeout: 5000,
	transition: transitions.FADE,
	containerStyle: {
		zIndex: 1070
	},
}

class App extends Component {
	componentDidMount() {
		if (store.getState().auth.token){
			store.dispatch(loadUser())
		}
		store.dispatch(loadProducts())
	}

	render() { 
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Header />
						<Cart />
						<Alerts /> 
						<Switch>
							<Route exact path="/" component={Home} /> 
							<Route path="/user" component={User} /> 
							<Route path="/login" component={Login} /> 
							<Route path="/register" component={Register} />
							<Route path="/catalog" component={Catalog} />
							<Route path="/product/:productId" component={Product} /> 
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