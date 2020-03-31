import { combineReducers } from 'redux'
import auth from './auth'
import error from './error'
import product from './product'

export default combineReducers({
  auth,
  error,
  product,
})