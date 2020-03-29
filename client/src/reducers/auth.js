import { 
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  userid: null
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
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false
      }
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoading: false
      }
    case LOGOUT_SUCCESS: 
      return {
        ...state,
        token: null,
        userid: null,
        isAuth: null,
        isLoading: false
      }
    default:
      return state
  }
}