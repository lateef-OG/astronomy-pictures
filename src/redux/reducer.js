import { combineReducers } from 'redux';
import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    GET_DATE,
    GET_FAVORITE_IMAGE,
} from './actionTypes';
import { currentDate } from '../util/helper';

const date = currentDate();

const initialState = {
    loading: false,
    imageData: {},
    error: null,
    date,
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST: 
            return { ...state, loading: true, imageData: {}, error: null};
        case GET_IMAGE_DATA:
            return { ...state, loading: false, imageData: action.payload.imageData };
        case GET_FAVORITE_IMAGE:
            return { ...state, imageData: action.payload.imageData}
        case IMAGE_DATA_ERROR:
            return { ...state, loading: false, error: action.payload.error, imageData: {} }
        case GET_DATE: 
            return { ...state, date: action.payload.date };
        default:
            return state;
    } 
}

const reducer = combineReducers({
    image: imageReducer,
});

export default reducer;