import { 
	OPEN_CART, 
	CLOSE_CART,
} from '../actions/types'

const initialState = {
	cart: {
		status: false,
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CART:
			document.body.setAttribute('style', 'overflow: hidden;')
			return {
				...state,
				cart: {
					status: true,
				},
			}
		case CLOSE_CART:
			document.body.removeAttribute('style')  
			return {
				...state,
				cart: {
					status: false,
				}
			}
		default: 
			return state
	}
}