import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    TOGGLE_FAVORITE_IMAGE,
    GET_FAVORITE_IMAGES,
    DELETE_FAVOURITE_IMAGES,
    GET_PREVIEW_IMAGE,
} from './actionTypes';
import { baseUrl } from '../util/url';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NASA_APOD_KEY;

const makeRequest = (date) => {
    return {
        type: MAKE_REQUEST, 
        payload: { date }
    };
};

const fetchImage = (imageData, date) => {
    return { 
        type: GET_IMAGE_DATA, 
        payload: { 
            imageData, 
            date
        } 
    };
};

const previewImages = (prevImage, type) => {
    return {
        type: GET_PREVIEW_IMAGE,
        payload: { prevImage, type }
    }
}

const fetchError = (error, date) => {
    return {
        type: IMAGE_DATA_ERROR,
        payload: { 
            error,
            date 
        }
    };
};

const toggleFavouriteImage = (favouriteImages) => {
    return { 
        type: TOGGLE_FAVORITE_IMAGE,
        payload: { favouriteImages }
    };
};

const getFavouriteImages = (favouriteImages) => {
    return {
        type: GET_FAVORITE_IMAGES, 
        payload: { favouriteImages } 
    };
};

const deleteFavouriteImages = () => {
    return { 
        type: DELETE_FAVOURITE_IMAGES,
        payload: { favouriteImages: [] }
    };
};

export const getImageData = date => async dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    if(imagesData[date]) {
        dispatch(fetchImage(imagesData[date], date));
        return;
    }

    const cancelToken = axios.CancelToken.source();

    dispatch(makeRequest(date));
    
    await axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch(fetchImage(res.data, date));
        imagesData[date] = res.data;
        localStorage.setItem("imagesData", JSON.stringify(imagesData));
    }).catch(e => {
        if (axios.isCancel(e)) return;
        dispatch(fetchError(e.message, date));
    })

    return () => {
        cancelToken.cancel();
    }
}

export const getPreviewImages = (date, type) => async dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {};
    if(imagesData[date]) {
        dispatch(previewImages(imagesData[date], type));
        return;
    }

    const cancelToken = axios.CancelToken.source();
    
    await axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch(previewImages(res.data, type));
    }).catch(e => {
        if (axios.isCancel(e)) return;
        console.log(e.message);
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
    dispatch(toggleFavouriteImage(newFavouriteImages));
}

export const getFavourites = () => dispatch => {
    const favouriteImages = JSON.parse(localStorage.getItem("favouriteImages")) || []

    dispatch(getFavouriteImages(favouriteImages));
}

export const removeFavourites = () => dispatch => {
    localStorage.removeItem("favouriteImages");

    dispatch(deleteFavouriteImages());
}