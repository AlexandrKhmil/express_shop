import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './styles.module.css'
import { closeModal } from '../../../actions/modal'

class Cart extends Component {
  render() {
    const { status, closeModal } = this.props
    const wrapRef = React.createRef()

    return (
      <>
        {
          status
          ? <div 
              className={styles.modal} 
              ref={wrapRef}
              onClick={ (e) => { if (wrapRef.current === e.target) closeModal() } }
            >
              <div className={`card ${styles.modalContent}`}> 
                <h3 className="card-header">Ваша Корзина</h3>
                <div className="card-body"> 
                </div>   
                <div className="card-footer text-muted">
                  <NavLink 
                    className="btn btn-primary btn-lg btn-block"
                    to="/order"
                  >
                    Оформить заказ
                  </NavLink>
                </div> 
              </div>
            </div>
          : null
        }
      </>      
    )
  }
}

const mapStateToProps = state => ({
  status: state.modal.cart.status
})

export default connect(mapStateToProps, { closeModal })(Cart)