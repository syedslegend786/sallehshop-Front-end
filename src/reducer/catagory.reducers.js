import { catagoryConstants } from "../actions/actionConstants"

const initial_state = {
    allcatagoriesLoading: false,
    allcatagories: [{}],
    allcatagoriesError: '',
    createCatagoryError: ''
}
export default (state = initial_state, action) => {
    switch (action.type) {
        case catagoryConstants.GET_CATAGORIES_REQUEST:
            state = {
                ...state,
                allcatagoriesLoading: true,
            }
            break;
        case catagoryConstants.GET_CATAGORIES_SUCCESS:
            state = {
                ...state,
                allcatagoriesLoading: false,
                allcatagories: action.payload
            }
            break;
        case catagoryConstants.GET_CATAGORIES_FAILURE:
            state = {
                ...state,
                allcatagoriesLoading: false,
                allcatagoriesError: action.payload
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_REQUEST:
            state = {
                ...state,
                createCatagoryError: '',
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_SUCCESS:
            state = {
                ...state,
                createCatagoryError: '',
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_FAILURE:
            state = {
                ...state,
                createCatagoryError: action.payload,
            }
            break;
    }
    return state
}