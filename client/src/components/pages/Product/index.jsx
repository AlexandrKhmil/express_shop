import React, { Component } from 'react'
import { connect } from 'react-redux'

class Product extends Component {
  render() {
    const { products } = this.props
    const { productId } = this.props.match.params
    const product = products.find(item => item.id === parseInt(productId))
    return (
      <main> 
        {product !== undefined 
          ? <>
              <img src={require(`../../../../static/product/${product.imgsrc}`)} alt="Product" />
              This is {product.title} 
            </>
          : null
        } 
        <br /> 
      </main>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

export default connect(mapStateToProps, {})(Product)