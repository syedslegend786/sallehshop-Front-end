import { productConstants } from "../actions/actionConstants"

const initial_state = {
    products: [],
    loading: false,
    error: '',
    productDetailPageData: {},
    productDetailPageLoading: false,
    productDetailPageError: '',
    uploadPicture: {},
    uploadPictureLoading: false,
    uploadPictureError: '',
    createProductLoading: false,
    createProductError: '',
    updateProductLoading: false,
    updateProducError: '',
    deleteSingleProductLoading: false,
    deleteSingleProductError: '',
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
                productDetailPageLoading: true,
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetailPageLoading: false,
                productDetailPageData: action.payload,
            }
            break;
        case productConstants.GET_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                productDetailPageLoading: false,
                productDetailPageError: action.payload
            }
            break;
        case productConstants.UPLOAD_PICTURE_REQUEST:
            state = {
                ...state,
                uploadPictureLoading: true,
            }
            break;
        case productConstants.UPLOAD_PICTURE_SUCCESS:
            state = {
                ...state,
                uploadPictureLoading: false,
                uploadPicture: action.payload,
            }
            break;
        case productConstants.UPLOAD_PICTURE_FAILURE:
            state = {
                ...state,
                uploadPictureLoading: false,
                uploadPictureError: action.payload,
            }
            break;
        case productConstants.DESTROY_PICTURE_REQUEST:
            state = {
                ...state,
                uploadPictureLoading: true,
            }
            break;
        case productConstants.DESTROY_PICTURE_SUCCESS:
            state = {
                ...state,
                uploadPictureLoading: false,
                uploadPicture: {},
            }
            break;
        case productConstants.DESTROY_PICTURE_FAILURE:
            state = {
                ...state,
                uploadPictureLoading: false,
            }
            break;
        case productConstants.CREAT_PRODUCT_REQUEST:
            state = {
                ...state,
                createProductLoading: true,
                createProductError: '',
            }
            break;
        case productConstants.CREAT_PRODUCT_SUCCESS:
            state = {
                ...state,
                createProductLoading: false,
                uploadPicture: {},
                createProductError: '',
            }
            break;
        case productConstants.CREAT_PRODUCT_FAILURE:
            state = {
                ...state,
                createProductLoading: false,
                createProductError: action.payload,
            }
            break;
        case productConstants.UPDATE_PRODUCTS_REQUEST:
            state = {
                ...state,
                updateProductLoading: true,
            }
            break;
        case productConstants.UPDATE_PRODUCTS_SUCCESS:
            state = {
                ...state,
                updateProductLoading: false,
            }
            break;
        case productConstants.UPDATE_PRODUCTS_FAILURE:
            state = {
                ...state,
                updateProductLoading: false,
                updateProducError: action.payload,
            }
            break;
        case productConstants.DELETE_PRODUCT_REQUEST:
            state = {
                ...state,
                deleteSingleProductLoading: true,
            }
            break;
        case productConstants.DELETE_PRODUCT_SUCCESS:
            state = {
                ...state,
                deleteSingleProductLoading: false,
            }
            break;
        case productConstants.DELETE_PRODUCT_FAIILURE:
            state = {
                ...state,
                deleteSingleProductLoading: false,
                deleteSingleProductError: action.payload,
            }
            break;
    }
    return state;
}