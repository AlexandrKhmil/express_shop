import React, { Component } from 'react'
import styles from './styles.module.css'

class CartButton extends Component {
  render() {
    return (
      <button 
        className={
          `btn btn-outline-primary ${styles.cartButton}`
        }
      >
        A
      </button>
    )
  }
}

export default CartButton