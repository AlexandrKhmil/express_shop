import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.css' 
import { openCart } from '../../../actions/modal'

class CartButton extends Component {
  render() {
    const { openCart, className, products } = this.props
    const count = Object.values(products).reduce((prev, product) => prev + product.count, 0)

    return (
      <button 
        className={
          `position-relative btn btn-secondary ml-1 ${styles.cartButton} ${className}` 
        }
        onClick={openCart}
      > 
        <img className={styles.img} src={require('../../../../static/other/shopping-cart.svg')} />
        {
          count > 0
            ? <span className={`${styles.count}`}>{count}</span>
            : null
        } 
      </button>
    )
  }
}

const mapStateToProps = state => ({
  products: state.modal.cart.products 
})

export default connect(
  mapStateToProps, 
  { openCart }
)(CartButton)