import { 
  OPEN_CART, 
  CLOSE_CART,
  ADD_TO_CART, 
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
} from './types'

export const openCart = () => dispatch => {
  dispatch({ type: OPEN_CART })
}

export const closeCart = () => dispatch => {
  dispatch({ type: CLOSE_CART })
} 

export const addToCart = product => (dispatch, getState) => {
  let products = Object.values(getState().modal.cart.products)
	const index = products.findIndex(item => item.id === product.id)
	if (index !== -1) {
		products[index].count += 1
	} else {
		products = {...products, [Object.keys(products).pop() + 1]: {...product, count: 1}}
  }
      
  dispatch({
    type: ADD_TO_CART,
    payload: products,
  })
}

export const removeFromCart = product => (dispatch, getState) => {
  let products = Object.values(getState().modal.cart.products)
	const index = products.findIndex(item => item.id === product.id)
	if (index !== -1) {
    products[index].count -= 1 
    if (products[index].count <= 0) {
      products = Object.assign({}, Object.values(products).filter(item => item.id !== product.id)) 
    }
	} 
      
  dispatch({
    type: REMOVE_FROM_CART,
    payload: products,
  })
}

export const deleteFromCart = product => (dispatch, getState) => {
  let products = Object.values(getState().modal.cart.products)
  products = Object.assign({}, Object.values(products).filter(item => item.id !== product.id)) 
  dispatch({
    type: DELETE_FROM_CART,
    payload: products,
  })
}