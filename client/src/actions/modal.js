import { 
  OPEN_CART, 
  CLOSE_CART,
} from './types'

export const openCart = () => dispatch => {
  dispatch({ type: OPEN_CART })
}

export const closeCart = () => dispatch => {
  dispatch({ type: CLOSE_CART })
}