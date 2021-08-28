import axios from '../helpers/axios'
import store from '../store'
import { filteringConstants, productConstants } from './actionConstants'

// limit=${page * 9}&title[regex]=${search}&${sort}&${catagory
export const getAllProductsAction = (check) => {
    return async (dispatch) => {
        try {
            if (!check) {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_REQUEST,
                })
            }
            const { search, sort, page, catagory } = store.getState().filtering
            const res = await axios.get(`/product?limit=${page * 6}&${catagory}&title[regex]=${search}&sort=${sort}`)
            console.log(res.data)
            if (res.status === 200) {
                dispatch({
                    type: filteringConstants.UPDATE_RESULT_SUCCESS,
                    payload: res.data.result
                })
                // dispatch({
                //     type: filteringConstants.UPDATE_TOTALPAGES_SUCCESS,
                //     payload: res.data.pages,
                // })
                console.log(res.data.pages)
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: res.data.products
                })
            } else {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    payload: res.data.message,
                })
            }
        } catch (err) {
            console.log(err.message)
        }

    }
}

export const getProductById = (pid) => {
    try {
        return async (dispatch) => {
            dispatch({
                type: productConstants.GET_PRODUCT_BY_ID_REQUEST,
            })
            const res = await axios.get(`/product/${pid}`)
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
                    payload: res.data.product
                })
            } else {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
                    payload: res.data.msg,
                })
            }
        }
    } catch (err) {
        console.log(err.message)
    }
}

export const uploadPictureAction = (form) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.UPLOAD_PICTURE_REQUEST,
        })
        const res = await axios.post('/upload', form)
        if (res.status === 200) {
            await dispatch({
                type: productConstants.UPLOAD_PICTURE_SUCCESS,
                payload: res.data,
            })
            return true
        }
        else {
            dispatch({
                type: productConstants.UPLOAD_PICTURE_FAILURE,
                payload: res.data.msg,
            })
        }
    }
}

export const destroyPicture = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.DESTROY_PICTURE_REQUEST,
        })
        const res = await axios.post('/destroy', {
            ...payload,
        })
        if (res.status === 200) {
            dispatch({
                type: productConstants.DESTROY_PICTURE_SUCCESS,
            })
            return true;
        }
        else {
            dispatch({
                type: productConstants.DESTROY_PICTURE_FAILURE,
            })
        }
    }
}

export const createProduct = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: productConstants.CREAT_PRODUCT_REQUEST,
            })
            const res = await axios.post('/product', {
                ...payload
            })
            if (res.status == 200) {
                dispatch({
                    type: productConstants.CREAT_PRODUCT_SUCCESS,
                })
                dispatch(getAllProductsAction())
                return true;
            }
        } catch (err) {
            dispatch({
                type: productConstants.CREAT_PRODUCT_FAILURE,
                payload: err.response.data.msg,
            })
        }
    }
}

export const updatedProduct = (id, payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: productConstants.UPDATE_PRODUCTS_REQUEST,
            })
            const res = await axios.put(`/product/${id}`, {
                ...payload
            })
            if (res.status == 200) {
                dispatch({
                    type: productConstants.UPDATE_PRODUCTS_SUCCESS,
                })
                dispatch(getAllProductsAction())
                return true;
            }
        } catch (err) {
            dispatch({
                type: productConstants.UPDATE_PRODUCTS_FAILURE,
                payload: err.response.data.msg,
            })
        }
    }
}

export const handleCheckedAction = (productType, pid = null, checkAlltype) => {
    return async (dispatch) => {
        //for single product deletion...
        if (productType === 'singleProduct') {
            let toReturn = store.getState().product.products;
            toReturn = toReturn.map((val) => val._id === pid ? { ...val, checked: !val.checked } : val)
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: toReturn
            })

        }
        //for all checked products deletiong....
        if (productType === 'allProducts') {
            let toReturn = store.getState().product.products;
            toReturn = toReturn.map((val) => ({ ...val, checked: !checkAlltype }))
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: toReturn
            })
        }
    }

}


export const deleteSingleProduct = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: productConstants.DELETE_PRODUCT_REQUEST,
            })
            await axios.post('/destroy', {
                public_id: payload.images.public_id,
            })
            await axios.delete(`/product/${payload._id}`)
            dispatch({
                type: productConstants.DELETE_PRODUCT_SUCCESS,
            })
            dispatch(getAllProductsAction())
        } catch (err) {
            dispatch({
                type: productConstants.DELETE_PRODUCT_FAIILURE,
                msg: err.response.data.msg,
            })
            return false;
        }
    }
}
export const deleteAllCheckedProductsAction = () => {
    return async (dispatch) => {
        try {
            const allProducts = store.getState().product.products
            allProducts.forEach(async (val) => {
                if (val.checked) {
                    await dispatch(deleteSingleProduct(val))
                }
            })
        }
        catch (err) {
            console.log(err.message)
        }
    }
}

export const updateCatagory = (payload) => {
    return async (dispatch) => {
        await dispatch({
            type: filteringConstants.UPDATE_CATAGORY_SUCCESS,
            payload: payload
        })
        dispatch(getAllProductsAction())
    }
}
export const updateSearch = (payload) => {
    return async (dispatch) => {
        await dispatch({
            type: filteringConstants.UPDATE_SEARCH_SUCCESS,
            payload: payload
        })
        dispatch(getAllProductsAction())
    }
}
export const updateSort = (payload) => {
    return async (dispatch) => {
        await dispatch({
            type: filteringConstants.UPDATE_SORT_SUCCESS,
            payload: payload
        })
        dispatch(getAllProductsAction())
    }
}
export const updatePage = (payload) => {
    return async (dispatch) => {
        await dispatch({
            type: filteringConstants.UPDATE_PAGE_SUCCESS,
            payload: payload
        })
        dispatch(getAllProductsAction(true))
    }
}