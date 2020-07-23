import { combineReducers } from 'redux';
import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR 
} from './actionTypes';

const initialState = {
    loading: false,
    imageData: {},
    error: null
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST: 
            return { loading: true, imageData: {}};
        case GET_IMAGE_DATA:
            return { ...state, loading: false, imageData: action.payload.imageData };
        case IMAGE_DATA_ERROR:
            return { ...state, loading: false, error: action.payload.error, imageData: {} }
        default:
            return state;
    } 
}

const reducer = combineReducers({
    image: imageReducer,
});

export default reducer;