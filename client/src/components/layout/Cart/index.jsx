import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.css'
import { closeCart } from '../../../actions/modal'

class Cart extends Component {
	render() {
		const { status, closeCart } = this.props
		const wrapRef = React.createRef() 

		return (
			<>
				<CSSTransition
					in={status}
					timeout={200}
					classNames={{ 
						enter: styles.enter,
						enterActive: styles.enterActive, 
						exit: styles.exit,
						exitActive: styles.exitActive, 
					}}
					unmountOnExit
				>
					<div 
						className={styles.modal} 
						ref={wrapRef}
						onClick={ (e) => { if (wrapRef.current === e.target) closeCart() } }
					>
						<div className={`card ${styles.modalContent}`}>
							<div className="card-header position-relative">
								<h3>Ваша Корзина</h3>
								<button 
									type="button" 
									className={`close ${styles.closeCart}`} 
									onClick={closeCart}
								>
									&times;
								</button>
							</div>   
							<div className="card-body"> 
							</div>   
							<div className="card-footer text-muted">
								<NavLink 
									className="btn btn-primary btn-lg btn-block"
									to="/order"
									onClick={closeCart}
								>
									Оформить заказ
								</NavLink>
							</div> 
						</div>
					</div> 
				</CSSTransition>
			</>      
		)
	}
}

const mapStateToProps = state => ({
	status: state.modal.cart.status
})

export default connect(mapStateToProps, { closeCart })(Cart)