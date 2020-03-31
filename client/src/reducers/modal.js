import { 
	OPEN_CART, 
	CLOSE_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	DELETE_FROM_CART,
} from '../actions/types'

const initialState = {
	cart: {
		status: false,
		products: (() => {
			const data = JSON.parse(localStorage.getItem('cartProducts'))
			return data !== null ? data : {} 
		})(),
	}
}

export default (state = initialState, action) => {
	switch (action.type) { 
		case OPEN_CART:
			document.body.setAttribute('style', 'overflow: hidden;')
			return {
				...state,
				cart: {
					...state.cart,
					status: true,
				},
			}
		case CLOSE_CART:
			document.body.removeAttribute('style')  
			return {
				...state,
				cart: {
					...state.cart,
					status: false,
				}
			}
		case ADD_TO_CART:
		case REMOVE_FROM_CART:
		case DELETE_FROM_CART:
			localStorage.setItem('cartProducts', JSON.stringify(action.payload))
			return {
				...state,
				cart: {
					...state.cart,
					products: action.payload,
				}
			}
		default: 
			return state
	}
}