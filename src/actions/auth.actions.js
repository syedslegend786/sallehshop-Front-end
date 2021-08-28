import axios from '../helpers/axios'
import { authConstants, cartConstants, paymentConstants } from './actionConstants'
import store from '../store/index'

export const loginAction = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: authConstants.LOGIN_REQUEST,
            })
            const res = await axios.post(`/user/login`, {
                ...payload
            })
            if (res.status === 200) {
                const { token } = res.data
                console.log(res.data)
                if (token) {
                    localStorage.setItem('token', token)
                }
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: res.data.token,
                })
                return true
            }
        } catch (err) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: err.response.data.msg
            })
        }
    }
}

export const keepUserLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            console.log('==>kepp login', token)
            if (token) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: token
                })
                const res = await axios.get('/infor')
                if (res.status === 200) {
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: token,
                    })
                    // dispatch({
                    //     type: authConstants.KEEP_USER_LOGIN_SUCCESS,
                    //     payload: res.data.accessToken
                    // })
                    dispatch(getUserInformation())
                }
            }

        } catch (err) {
            console.log(err.message)
        }

    }
}

export const logOutAction = () => {
    return async (dispatch) => {
        try {
            localStorage.clear()
            dispatch({
                type: authConstants.LOGOUT_SUCCESS,
            })
        } catch (err) {
            console.log(err.message)
        }

    }
}

export const getUserInformation = () => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/infor')
            if (res.status === 200) {
                dispatch({
                    type: authConstants.USER_INFOR_SUCCESS,
                    payload: res.data.user
                })
            }
        } catch (err) {
            console.log(err.message)
        }

    }
}
export const addToCartAction = (payload) => {
    return async (dispatch) => {
        try {
            const cartItems = store.getState().auth.user.cart
            const isExists = cartItems.find(val => val._id == payload._id)
            if (isExists) {
                return
            } else {
                dispatch({
                    type: authConstants.ADD_TO_CART_SUCCESS,
                    payload: [...cartItems, { ...payload, quantity: 1 }]
                })
                await axios.patch('/user/addtocart', {
                    cart: [...cartItems, { ...payload, quantity: 1 }]
                })

            }
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const cartItemIncrement = (id) => {
    return async (dispatch) => {
        try {
            const cartItems = store.getState().auth.user.cart
            const toSend = cartItems.map((val) => (
                val._id !== id ? val : { ...val, quantity: ++val.quantity }
            ))
            dispatch({
                type: cartConstants.CART_INCREMENT_SUCCESS,
                payload: toSend,
            })
            await axios.patch('/user/addtocart', {
                cart: toSend
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}
export const cartItemDecrement = (id) => {
    return async (dispatch) => {
        try {
            const cartItems = store.getState().auth.user.cart
            const toSend = cartItems.map((val) => (
                val._id !== id ? val : { ...val, quantity: --val.quantity }
            ))
            dispatch({
                type: cartConstants.CART_DECREMENT_SUCCESS,
                payload: toSend,
            })
            await axios.patch('/user/addtocart', {
                cart: toSend
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}


export const removeCartItem = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            const cartItems = store.getState().auth.user.cart
            const toReturn = []
            cartItems.forEach((val) => {
                if (val._id !== id) {
                    toReturn.push(val)
                }
            })
            dispatch({
                type: cartConstants.CART_REMOVE_SUCCESS,
                payload: toReturn,
            })
            await axios.patch('/user/addtocart', {
                cart: toReturn
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const createPaymentAction = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: cartConstants.CART_INCREMENT_SUCCESS,
            payload: [],
        })
        await axios.patch('/user/addtocart', {
            cart: []
        })
        const res = await axios.post('/user/createpayment', {
            ...payload
        })
    }
}
export const getPayments = () => {

    return async (dispatch) => {
        try {
            dispatch({
                type: paymentConstants.GET_HISTORY_PAYMENTS_REQUEST,
            })
            const res = await axios.get('/user/getpayments')
            if (res.status === 200) {
                dispatch({
                    type: paymentConstants.GET_HISTORY_PAYMENTS_SUCCESS,
                    payload: res.data.payments,
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    }
}
export const getAllPaymentsAdmin = () => {

    return async (dispatch) => {
        try {
            dispatch({
                type: paymentConstants.GET_HISTORY_PAYMENTS_REQUEST,
            })
            const res = await axios.get('/admin/getpayments')
            if (res.status === 200) {
                dispatch({
                    type: paymentConstants.GET_HISTORY_PAYMENTS_SUCCESS,
                    payload: res.data.payments,
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    }
}


export const registerAction = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: authConstants.REGISTER_REQUEST,
            })
            const res = await axios.post(`/user/register`, {
                ...payload
            })
            if (res.status === 200) {
                localStorage.setItem('firstLogin', 'firstLogin')
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                })
                return true
            }
        } catch (err) {
            return dispatch({
                type: authConstants.REGISTER_FAILURE,
                payload: err.response.data.msg,
            })
        }

    }
}
