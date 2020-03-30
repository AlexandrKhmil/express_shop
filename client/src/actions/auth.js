import axios from 'axios'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,


  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT_SUCCESS, 
} from './types'

const jsonReqest = (bodyObj) => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify(bodyObj)
  return { config, body }
}

// REGISTER 
export const register = (email, password) => dispatch => {
  const { body, config } = jsonReqest({ email, password })
  axios
    .post('/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL })
      console.log(err)
      console.log(err.response)
    })
}












// LOAD USER & CHECK TOKEN  
export const loadUser = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING})
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

// LOGIN USER
export const login = (email, password) => dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password})

  axios
    .post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }) 
    .catch(err => { 
      console.log(err.response.data)
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// LOGOUT 
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })
    .catch(err => console.log(err))
}



const tokenConfig = getState => {
  const token = getState().auth.token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers['authorization'] = token
  }

  return config
}