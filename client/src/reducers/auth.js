import { 
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL, 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT, 
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  userId: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED: 
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        ...action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token') 
      return {
        ...state,
        token: null,
        userId: null,
        isAuth: null,
        isLoading: false
      }
    default:
      return state
  }
}