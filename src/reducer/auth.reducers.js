import { authConstants, cartConstants, paymentConstants } from "../actions/actionConstants"

const initital_state = {
    authenticating: false,
    authenticate: false,
    authError: '',
    token: '',
    user: {
        role: '',
        cart: [],
        _id: '',
        name: '',
        email: ''
    },
    historyPageData: [{}],
    historyPageDataLoading: false,
}
export default (state = initital_state, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
                token: action.payload,
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                authError: action.payload,
            }
            break;
        case authConstants.KEEP_USER_LOGIN_SUCCESS:
            state = {
                ...state,
                accessToken: action.payload,
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initital_state,
            }
            break;
        case authConstants.USER_INFOR_SUCCESS:
            state = {
                ...state,
                user: action.payload
            }
            break;
        case authConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, cart: action.payload }
            }
            break;
        case cartConstants.CART_INCREMENT_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, cart: action.payload }
            }
            break;
        case cartConstants.CART_DECREMENT_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, cart: action.payload }
            }
            break;
        case cartConstants.CART_REMOVE_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, cart: action.payload }
            }
            break;
        case paymentConstants.GET_HISTORY_PAYMENTS_REQUEST:
            state = {
                ...state,
                historyPageDataLoading: true,
            }
            break;
        case paymentConstants.GET_HISTORY_PAYMENTS_SUCCESS:
            state = {
                ...state,
                historyPageDataLoading: false,
                historyPageData: action.payload
            }
            break;
        case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }
            break;
        case authConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
            }
            break;
        case authConstants.REGISTER_FAILURE:
            state = {
                ...state,
                authenticating: false,
                authError: action.payload,
            }
            break;
    }
    return state;
}