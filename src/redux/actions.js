import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    TOGGLE_FAVORITE_IMAGE,
    GET_FAVORITE_IMAGES,
    DELETE_FAVOURITE_IMAGES
} from './actionTypes';
import { baseUrl } from '../util/url';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NASA_APOD_KEY;

export const getImageData = date => dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    if(imagesData[date]) {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: imagesData[date], date} })
        return;
    }

    const cancelToken = axios.CancelToken.source();

    dispatch({ type: MAKE_REQUEST, payload: { date } });
    
    axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: res.data, date  } })
        imagesData[date] = {...res.data, isFavourite: false};
        localStorage.setItem("imagesData", JSON.stringify(imagesData));
    }).catch(e => {
        if (axios.isCancel(e)) return;
        dispatch({ type: IMAGE_DATA_ERROR, payload: { error: e.message, date } })
    })

    return () => {
        cancelToken.cancel();
    }
}

export const toggleFavourite = date => dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    const favouriteImages = JSON.parse(localStorage.getItem("favouriteImages")) || []

    const isFavourite = favouriteImages.filter(image => image.date === date);

    let newFavouriteImages;

    if (isFavourite.length > 0) {
        newFavouriteImages = favouriteImages.filter(image => image.date !== date);
    } else {
        newFavouriteImages = [...favouriteImages, imagesData[date]]
    }
    localStorage.setItem("favouriteImages", JSON.stringify(newFavouriteImages));
    
    dispatch({ type: TOGGLE_FAVORITE_IMAGE, payload: { favouriteImages: newFavouriteImages } })
}

export const getFavouriteImages = () => dispatch => {
    const favouriteImages = JSON.parse(localStorage.getItem("favouriteImages")) || []

    dispatch({ type: GET_FAVORITE_IMAGES, payload: { favouriteImages } })
}

export const removeFavourites = () => dispatch => {
    localStorage.removeItem("favouriteImages");

    dispatch({ type: DELETE_FAVOURITE_IMAGES, payload: { favouriteImages: [] } })
}