import { filteringConstants } from "../actions/actionConstants"

const initial_state = {
    search: '',
    page: 1,
    catagory: '',
    sort: '',
    result: 0,
    totalPages: 1
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case filteringConstants.UPDATE_SEARCH_SUCCESS:
            state = {
                ...state,
                search: action.payload,
            }
            break;
        case filteringConstants.UPDATE_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload,
            }
            break;
        case filteringConstants.UPDATE_CATAGORY_SUCCESS:
            state = {
                ...state,
                catagory: action.payload,
            }
            break;
        case filteringConstants.UPDATE_SORT_SUCCESS:
            state = {
                ...state,
                sort: action.payload,
            }
            break;
        case filteringConstants.UPDATE_RESULT_SUCCESS:
            state = {
                ...state,
                result: action.payload,
            }
            break;
        case filteringConstants.UPDATE_TOTALPAGES_SUCCESS:
            state = {
                ...state,
                totalPages: action.payload,
            }
            break;
    }
    return state;
}