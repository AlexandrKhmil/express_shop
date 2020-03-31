import { PRODUCTS_LOADED } from '../actions/types'

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
    default:
      return state
  }
}