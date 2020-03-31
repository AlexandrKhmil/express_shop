import { combineReducers } from 'redux'
import auth from './auth'
import error from './error'
import product from './product'
import modal from './modal'

export default combineReducers({
  auth,
  error,
  product,
  modal,
})