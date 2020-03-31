import { 
  OPEN_CART 
} from './types'

export const openCart = () => dispatch => {
  dispatch({ type: OPEN_CART })
}