import { combineReducers } from 'redux';
import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    TOGGLE_FAVORITE_IMAGE,
    GET_FAVORITE_IMAGES,
    DELETE_FAVOURITE_IMAGES,
    GET_PREVIEW_IMAGE,
} from './actionTypes';
import { currentDate } from '../util/helper';

const date = currentDate();

const initialState = {
    loading: false,
    imageData: {},
    error: null,
    favouriteImages: [],
    previewImages: {},
    date,
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST: 
            return { ...state, loading: true, imageData: {}, error: null, date: action.payload.date };
        case GET_IMAGE_DATA:
            return { ...state, loading: false, imageData: action.payload.imageData, date: action.payload.date, error: null };
        case GET_PREVIEW_IMAGE:
            return { ...state, previewImages: { ...state.previewImages, [action.payload.type]: action.payload.prevImage } };
        case IMAGE_DATA_ERROR:
            return { ...state, loading: false, error: action.payload.error, imageData: {}, date: action.payload.date };
        case TOGGLE_FAVORITE_IMAGE:
            return { ...state, favouriteImages: action.payload.favouriteImages };
        case GET_FAVORITE_IMAGES:
            return { ...state, favouriteImages: action.payload.favouriteImages }
        case DELETE_FAVOURITE_IMAGES:
            return { ...state, favouriteImages: action.payload.favouriteImages }
        default:
            return state;
    } 
}

const reducer = combineReducers({
    image: imageReducer,
});

export default reducer;