
import { combineReducers } from "redux";
import productReducer from './product.reducers'
import authReducer from './auth.reducers'
import catagoryReducer from './catagory.reducers'
import filteringReducer from './filterPaginationSeach.reducers'
const rootReducer = combineReducers({
    product: productReducer,
    auth: authReducer,
    catagory: catagoryReducer,
    filtering: filteringReducer,
})
export default rootReducer