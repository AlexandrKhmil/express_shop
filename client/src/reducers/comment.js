import { 
  GET_COMMENTS, 
  ADD_COMMENT,
} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
    case GET_COMMENTS:
      if (Object.keys(action.payload).length === 0) {
        return state
      }
      return {
        ...state,
        [action.payload[0].productId]: action.payload,
      }
    case ADD_COMMENT:
      return state
		default: 
			return state
	}
}