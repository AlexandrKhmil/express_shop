import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.css'
import { closeCart, addToCart, removeFromCart, deleteFromCart } from '../../../actions/modal'

class Cart extends Component {
	render() {
		const { status, products, closeCart, addToCart, removeFromCart, deleteFromCart } = this.props
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
							<div className={`card-body ${styles.modalBody}`}> 
								{
									products.map((product, indx) =>
										<div className="card card-body border-primary flex-row mb-3" key={indx}>
											<NavLink className="" to={`/product/${product.id}`}>
												<img 
													className={styles.img}
													src={require(`../../../../static/product/${product.imgsrc}`)} 
													alt="Product" 
												/>
											</NavLink>
											<div className="d-flex flex-column ml-3">
												<NavLink className="card-title" to={`/product/${product.id}`}>
												{
													product.title.length >= 45 
														? `${product.title.substring(0, 45)}...`
														: product.title
												}
												</NavLink>
												<span className="card-text mt-auto">{product.price.toFixed(2)} $ &times; {product.count} = {(product.price * product.count).toFixed(2)} $</span>
											</div>
											<div className="d-flex flex-column ml-auto">
												<button 
													className={`mb-auto ${styles.button} ${styles.buttonRed}`}
													onClick={() => deleteFromCart(product)}
												>
													&times;
												</button>
												<button 
													className={`mb-1 ${styles.button}`}
													onClick={() => addToCart(product)}
												>
													+
												</button>
												<button 
													className={`${styles.button}`}
													onClick={() => removeFromCart(product)}
												>
													-
												</button>
											</div>
										</div>
									)
								}
							</div>
							<div className={`d-flex justify-content-between align-items-center px-3 ${styles.total}`}>
								<span>Всего:</span>
								<span>{products.reduce((prev, product) => prev + product.price * product.count, 0).toFixed(2)} $</span>
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
	status: state.modal.cart.status,
	products: Object.values(state.modal.cart.products),
})

export default connect(mapStateToProps, { closeCart, addToCart, removeFromCart, deleteFromCart })(Cart)