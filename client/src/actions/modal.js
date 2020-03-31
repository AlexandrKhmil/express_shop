import { 
  OPEN_CART, 
  CLOSE_MODAL,
} from './types'

export const openCart = () => dispatch => {
  dispatch({ type: OPEN_CART })
}

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_MODAL })
}