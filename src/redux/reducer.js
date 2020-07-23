import { combineReducers } from 'redux';
import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    GET_DATE, 
    PREV_DATE,
    NEXT_DATE
} from './actionTypes';
import { currentDate } from '../util/helper';

const initialState = {
    loading: false,
    imageData: {},
    error: null,
    date: currentDate(),
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

const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATE: 
            return { ...state, date: action.payload.date };
        case PREV_DATE: 
            return { ...state, date: action.payload.date };
        case NEXT_DATE:
            return { ...state, date: action.payload.date };
        default:
            return state;
    }
}

const reducer = combineReducers({
    image: imageReducer,
    date: dateReducer,
});

export default reducer;