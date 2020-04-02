import axios from 'axios'
import { PRODUCTS_LOADED, ADD_VOTE } from './types'
import { returnErrors } from './error'

const jsonReqest = (bodyObj) => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify(bodyObj)
  return { config, body }
}

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

export const addVote = (email, productId, value) => dispatch => {
  const { body, config } = jsonReqest({ email, productId, value })
  
  axios
    .post('/api/product/vote', body, config)
    .then(res => {
      dispatch({ type: ADD_VOTE })
      return axios.get('/api/product/catalog')
    })
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

// export const addComment = (email, message, productId) => dispatch => {
//   let { body, config } = jsonReqest({ email, message, productId }) 
//   axios
//     .post('/api/comment/add', body, config)
//     .then(res => {
//       dispatch({
//         type: ADD_COMMENT
//       })
//       const { config } = jsonReqestGet({ productid: productId })
//       return axios.get('/api/comment/comments', config)
//     })
//     .then(res => {
//       dispatch({ 
//         type: GET_COMMENTS,
//         payload: res.data
//       })
//     })
//     .catch(err => { 
//       dispatch(returnErrors(err.response.data.message, err.response.status))
//     })
// }