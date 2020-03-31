import axios from 'axios'
import { PRODUCTS_LOADED } from './types'
import { returnErrors } from './error'

export const loadProducts = () => dispatch => {
  axios
    .get('/api/product/catalog')
    .then(res => {
      dispatch({ 
        type: PRODUCTS_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data.message, err.response.status))
    })
}