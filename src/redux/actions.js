import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    GET_DATE,
    GET_FAVORITE_IMAGE,
} from './actionTypes';
import { baseUrl } from '../util/url';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NASA_APOD_KEY;

export const getImageData = date => dispatch => {
    const imageData = JSON.parse(localStorage.getItem("imageData")) || {}
    if(imageData[date]) {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: imageData[date]} })
        return;
    }

    const cancelToken = axios.CancelToken.source();
    dispatch({ type: MAKE_REQUEST });
    axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: res.data } })
        imageData[date] = {...res.data, isFavourite: false};
        localStorage.setItem("imageData", JSON.stringify(imageData));
    }).catch(e => {
        if (axios.isCancel(e)) return;
        dispatch({ type: IMAGE_DATA_ERROR, payload: { error: e.message } })
    })

    return () => {
        cancelToken.cancel();
    }
}

export const selectDate = date => dispatch => {
    dispatch({ type: GET_DATE, payload: { date }})
}

export const toggleFavourite = date => dispatch => {
    const imageData = JSON.parse(localStorage.getItem("imageData")) || {}
    const image = imageData[date];
    const { isFavourite } = image;
    const newImage = {...image, isFavourite: !isFavourite};

    imageData[date] = newImage;
    localStorage.setItem("imageData", JSON.stringify(imageData));

    dispatch({ type: GET_FAVORITE_IMAGE, payload: { imageData: imageData[date]} })
}