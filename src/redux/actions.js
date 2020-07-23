import {
    MAKE_REQUEST,
    GET_IMAGE_DATA,
    IMAGE_DATA_ERROR,
    TOGGLE_FAVORITE_IMAGE,
    GET_FAVORITE_IMAGES,
} from './actionTypes';
import { baseUrl } from '../util/url';
import { ObjectToArray } from '../util/helper';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NASA_APOD_KEY;

export const getImageData = date => dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    if(imagesData[date]) {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: imagesData[date], date} })
        return;
    }

    const cancelToken = axios.CancelToken.source();
    dispatch({ type: MAKE_REQUEST });
    axios.get(`${baseUrl}?api_key=${API_KEY}&date=${date}`, {
        cancelToken: cancelToken.token,
    }).then(res => {
        dispatch({ type: GET_IMAGE_DATA, payload: { imageData: res.data, date  } })
        imagesData[date] = {...res.data, isFavourite: false};
        localStorage.setItem("imagesData", JSON.stringify(imagesData));
    }).catch(e => {
        if (axios.isCancel(e)) return;
        dispatch({ type: IMAGE_DATA_ERROR, payload: { error: e.message } })
    })

    return () => {
        cancelToken.cancel();
    }
}

export const toggleFavourite = date => dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    const image = imagesData[date];
    const { isFavourite } = image;
    const newImage = {...image, isFavourite: !isFavourite};

    imagesData[date] = newImage;
    localStorage.setItem("imagesData", JSON.stringify(imagesData));
    
    dispatch({ type: TOGGLE_FAVORITE_IMAGE, payload: { imageData: imagesData[date] } })
}

export const getFavouriteImages = () => dispatch => {
    const imagesData = JSON.parse(localStorage.getItem("imagesData")) || {}
    const imagesArray = ObjectToArray(imagesData);
    const favouriteImages = imagesArray.filter(image => image.isFavourite);

    dispatch({ type: GET_FAVORITE_IMAGES, payload: { favouriteImages } })
}