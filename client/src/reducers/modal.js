import { 
	OPEN_CART 
} from '../actions/types'

const initialState = {
	cart: {
		status: false,
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CART:
			return {
				...state,
				cart: {
					status: true,
				},
			}
		default: 
			return state
	}
}