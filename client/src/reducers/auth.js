import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}