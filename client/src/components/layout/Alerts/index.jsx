import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withAlert } from 'react-alert'

class Alerts extends Component {
	componentDidUpdate(prevProps) {
		const { error, alert } = this.props
		
		if (error != prevProps.error) {
			alert.error(error.msg)
		}
	}

	render() {
		return <></>
	}
}

const mapStateToProps = state => ({
	error: state.error, 
})

export default connect(mapStateToProps)(withAlert()(Alerts))