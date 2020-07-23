import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    GET_DATE,
    PREV_DATE,
    NEXT_DATE,
} from './actionTypes';
import { baseUrl } from '../util/url';
import { getPrevDate, getNextDate, getDate } from '../util/helper';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NASA_APOD_KEY;

export const getImageData = date => dispatch => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: MAKE_REQUEST });
    axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: res.data } })
    }).catch(e => {
        if (axios.isCancel(e)) return;
        dispatch({ type: IMAGE_DATA_ERROR, payload: { error: e.message } })
    })

    return () => {
        cancelToken.cancel();
    }
}

export const selectDate = date => dispatch => {
    dispatch({ type: GET_DATE, payload: { date: getDate(date)}})
}

export const prevDate = date => dispatch => {
    dispatch({ type: PREV_DATE, payload: { date: getPrevDate(date)}})
}

export const nextDate = date => dispatch => {
    dispatch({ type: NEXT_DATE, payload: { date: getNextDate(date)}})
}