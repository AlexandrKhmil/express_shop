import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../store" 

const A = () => <p>asdsad</p>
const B = () => <p>B</p>

class App extends Component {
	componentDidMount() {
		store.dispatch(() => ({type: 'ABC', value: 'VALUE'}))
		console.log(99999)
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={A} />
						<Route path="/b" component={B} />
					</Switch>
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