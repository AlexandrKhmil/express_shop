import React, { Component } from 'react'
import styles from './styles.module.css' 

class CartButton extends Component {
  render() {
    const { className } = this.props

    return (
      <button 
        className={
          `btn btn-secondary ml-1 ${styles.cartButton} ${className}` 
        }
      > 
        <img className={styles.img} src={require('../../../../static/other/shopping-cart.svg')} />
      </button>
    )
  }
}

export default CartButton

// btn btn-outline-primary 