import axios from '../helpers/axios'
import { catagoryConstants } from './actionConstants'



export const getAllCatagories = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: catagoryConstants.GET_CATAGORIES_REQUEST,
            })
            const res = await axios.get(`/catagory`)
            if (res.status == 200) {
                dispatch({
                    type: catagoryConstants.GET_CATAGORIES_SUCCESS,
                    payload: res.data.catagories,
                })
            }
        } catch (err) {
            dispatch({
                type: catagoryConstants.GET_CATAGORIES_FAILURE,
                payload: err.response.data.msg,
            })
        }

    }
}


export const createCatagoryAction = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: catagoryConstants.CREATE_CATAGORY_REQUEST,
            })
            const res = await axios.post(`/catagory`, {
                ...payload
            })
            if (res.status == 200) {
                dispatch({
                    type: catagoryConstants.CREATE_CATAGORY_SUCCESS,
                })
                dispatch(getAllCatagories());
                return true
            }
        } catch (err) {
            dispatch({
                type: catagoryConstants.CREATE_CATAGORY_FAILURE,
                payload: err.response.data.msg,
            })
        }

    }
}

export const deleteCatagory = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/catagory/${id}`)
            dispatch(getAllCatagories())
            return {
                status: true,
                msg: 'Catagory Created Successfully!'
            }
        } catch (err) {
            return {
                status: false,
                msg: err.response.data.msg,
            }
        }
    }
}

export const updateCatagory = (id, payload) => {
    return async (dispatch) => {
        try {
            await axios.put(`/catagory/${id}`, {
                ...payload,
            })
            dispatch(getAllCatagories())
            return true;
        } catch (err) {
            console.log(err.message)
        }
    }
}