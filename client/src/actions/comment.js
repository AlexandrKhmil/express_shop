import axios from 'axios'
import { 
  GET_COMMENTS, 
  ADD_COMMENT 
} from './types'
import { returnErrors } from './error'

const jsonReqestGet = headerObj => {
  const config = { headers: { 
    'Content-Type': 'application/json',
    ...headerObj,
  } } 

  return { config }
}

const jsonReqest = (bodyObj) => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify(bodyObj)
  return { config, body }
}

export const loadComments = productId => dispatch => {
  const { config } = jsonReqestGet({ productid: productId })
  axios
    .get('/api/comment/comments', config)
    .then(res => { 
      dispatch({ 
        type: GET_COMMENTS,
        payload: res.data
      })
    })
    .catch(err => { 
      dispatch(returnErrors(err.response.data.message, err.response.status))
    })
}

export const addComment = (email, message, productId) => dispatch => {
  let { body, config } = jsonReqest({ email, message, productId }) 
  axios
    .post('/api/comment/add', body, config)
    .then(res => {
      dispatch({
        type: ADD_COMMENT
      })
      const { config } = jsonReqestGet({ productid: productId })
      return axios.get('/api/comment/comments', config)
    })
    .then(res => {
      dispatch({ 
        type: GET_COMMENTS,
        payload: res.data
      })
    })
    .catch(err => { 
      dispatch(returnErrors(err.response.data.message, err.response.status))
    })
}

// axios.get(...)
//   .then((response) => {
//     return axios.get(...); // using response.data
//   })
//   .then((response) => {
//     console.log('Response', response);
//   });