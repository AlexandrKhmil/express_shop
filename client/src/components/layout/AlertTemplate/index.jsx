import React from 'react'

const AlertTemplate = ({ style, options, message, close }) => (
	<div className="alert alert-dismissible alert-warning" style={style}>
		<h4 className="alert-heading">Ошибка!</h4>
		<p className="mb-0">{message}</p>
		<button type="button" className="close" onClick={close}>&times;</button>
	</div>
)

export default AlertTemplate

{/* <div class="alert alert-dismissible alert-warning">
  <button type="button" class="close" data-dismiss="alert"></button>
  <h4 class="alert-heading">Warning!</h4>
  <p class="mb-0">Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" class="alert-link">vel scelerisque nisl consectetur et</a>.</p>
</div> */}

// {options.type === 'info' && '!'}
// 		{options.type === 'success' && ':)'}
// 		{options.type === 'error' && ':('}