import { 
  PRODUCTS_LOADED, 
  ADD_VOTE,
} from '../actions/types'

const initialState = {
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADED:
      return {
        ...state,
        products: action.payload,
      }
    case ADD_VOTE:
      return state
    default:
      return state
  }
}