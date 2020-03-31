import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './styles.module.css'

class Catalog extends Component {
  render() {
    const { products } = this.props
    console.log(styles)

    return (
      <main>
        <div className={styles.classA}></div>
        <div className="container mt-5">
          <div className="container card border-primary pt-3 px-5">
            <div className="row">
              { products.map((product, indx) => 
                <div className="col-sm-3 card border-light mb-3" key={indx}>
                  <img 
                    className={styles.img}
                    // style={{ maxHeight: '100px' }}
                    src={require(`../../../../static/product/${product.imgsrc}`)} 
                    alt="Product" 
                  />
                  <NavLink to={`/product/${product.id}`}>{product.title}</NavLink>
                  <span>$ {product.price.toFixed(2)}</span>
                </div>
              )}
            </div>  
          </div>
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