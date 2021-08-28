import axios from 'axios';
import { authConstants } from '../actions/actionConstants';
import store from './../store/index'


const token = localStorage.getItem("token")
const instance = axios.create({
    baseURL: "https://sallehshopbackend.herokuapp.com/api",
    headers: {
        "Authorization": token ? token : ''
    },
})
instance.interceptors.request.use((req) => {
    const token = store.getState().auth.token
    if (token) {
        console.log('inside req.intercepters===>', token)
        req.headers.Authorization = token
    }
    return req;
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})
instance.interceptors.response.use((res) => {
    return res
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if (status === 500) {
        localStorage.clear();
        store.dispatch({
            type: authConstants.LOGOUT_SUCCESS,
        })
    }
    return Promise.reject(error)
})
export default instance