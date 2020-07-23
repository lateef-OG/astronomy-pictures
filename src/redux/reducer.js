import { combineReducers } from 'redux';
import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    TOGGLE_FAVORITE_IMAGE,
    GET_FAVORITE_IMAGES
} from './actionTypes';
import { currentDate } from '../util/helper';

const date = currentDate();

const initialState = {
    loading: false,
    imageData: {},
    error: null,
    favouriteImages: [],
    date,
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST: 
            return { ...state, loading: true, imageData: {}, error: null };
        case GET_IMAGE_DATA:
            return { ...state, loading: false, imageData: action.payload.imageData, date: action.payload.date };
        case IMAGE_DATA_ERROR:
            return { ...state, loading: false, error: action.payload.error, imageData: {} };
        case TOGGLE_FAVORITE_IMAGE:
            return { ...state, imageData: action.payload.imageData };
        case GET_FAVORITE_IMAGES:
            return { ...state, favouriteImages: action.payload.favouriteImages }
        default:
            return state;
    } 
}

const reducer = combineReducers({
    image: imageReducer,
});

export default reducer;