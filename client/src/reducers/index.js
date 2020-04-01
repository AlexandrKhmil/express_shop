import { combineReducers } from 'redux'
import auth from './auth'
import error from './error'
import product from './product'
import modal from './modal'
import comment from './comment'

export default combineReducers({
  auth,
  error,
  product,
  modal, 
  comment,
})