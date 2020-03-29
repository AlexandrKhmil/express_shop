import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../store" 

// LAYOUT
import Header from './layout/Header'
import Footer from './layout/Footer'

// PAGES
import Home from './pages/Home'
import Login from './pages/Login'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} /> 
						<Route path="/login" component={Login} /> 
					</Switch>
					<Footer />
				</Router>
			</Provider> 
		)
	}
}

const container = document.getElementById('root')
render(
  <App />,
  container
)