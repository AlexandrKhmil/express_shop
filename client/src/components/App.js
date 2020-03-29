import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const A = () => <p>A</p>
const B = () => <p>B</p>

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={A} />
                    <Route path="/b" component={B} />
                </Switch>
            </Router>
        )
    }
}

export default App