import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './styles.module.css'

class Catalog extends Component {
  render() {
    const { products } = this.props
    
    return (
      <main>
        <div className="container mt-5"> 
          <div className="row">
            { 
              products.map((product, indx) => 
                <div className="col-6 col-xl-3 col-md-4 mb-3" key={indx}>
                  <div 
                    className={`card border-primary d-flex align-items-start p-4 ${styles.productBlock} ${styles.hoverShadow}`}
                  >
                    <NavLink className="align-self-center mb-3" to={`/product/${product.id}`}>
                      <img 
                        className={styles.img}
                        src={require(`../../../../static/product/${product.imgsrc}`)} 
                        alt="Product" 
                      />
                    </NavLink>
                    <NavLink className={styles.productName} to={`/product/${product.id}`}>
                      {
                        product.title.length >= 45 
                          ? `${product.title.substring(0, 45)}...`
                          : product.title
                      }
                    </NavLink>
                    <span className="mb-1">$ {product.price.toFixed(2)}</span>
                    <div className="d-flex justify-content-between w-100 mt-auto">
                      <button
                        className={`btn btn-primary ${styles.buttonText} ${styles.btnToCart}`}
                      >
                        В корзину
                      </button>
                      <NavLink
                        className={`btn btn-info ${styles.buttonText} ${styles.btnGoTo}`}
                        to={`/product/${product.id}`}
                      >
                        Перейти
                      </NavLink>
                    </div>
                  </div>
                </div>
              )
             }
          </div>   
        </div> 
        
        <div className="container mt-3">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <NavLink className="page-link" to="#">1</NavLink>
            </li>
            <li className="page-item">
              <NavLink className="page-link" to="#">2</NavLink>
            </li>
            <li className="page-item">
              <NavLink className="page-link" to="#">3</NavLink>
            </li>
          </ul>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

export default connect(
	mapStateToProps
)(Catalog)