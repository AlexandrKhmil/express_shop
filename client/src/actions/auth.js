import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT, 
} from './types'

const jsonReqest = (bodyObj) => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify(bodyObj)
  return { config, body }
}

const tokenConfig = getState => {
  const token = getState().auth.token
  const config = { headers: { 'Content-Type': 'application/json' } }
  if (token) config.headers['authorization'] = token
  return config
}

// LOAD USER & CHECK TOKEN  
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      })
      console.log(err)
      console.log(err.response)
    })
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

// LOGIN USER
export const login = (email, password) => dispatch => {
  const { body, config } = jsonReqest({ email, password })
  axios
    .post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }) 
    .catch(err => { 
      dispatch({ type: LOGIN_FAIL })
      console.log(err.response)
    })
}

// LOGOUT 
export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT })
  // axios
  //   .post('/api/auth/logout', tokenConfig(getState))
  //   .then(res => {
  //     dispatch({
  //       type: LOGOUT_SUCCESS
  //     })
  //   })
  //   .catch(err => console.log(err))
}



