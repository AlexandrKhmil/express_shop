import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.module.css' 
import { openCart } from '../../../actions/modal'

class CartButton extends Component {
  render() {
    const { openCart, className } = this.props

    return (
      <button 
        className={
          `btn btn-secondary ml-1 ${styles.cartButton} ${className}` 
        }
        onClick={openCart}
      > 
        <img className={styles.img} src={require('../../../../static/other/shopping-cart.svg')} />
      </button>
    )
  }
}

export default connect(state => ({}), { openCart })(CartButton)