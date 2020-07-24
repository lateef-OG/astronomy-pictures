import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData, toggleFavourite, getFavourites, removeFavourites, getPreviewImages } from '../../redux/actions';
import { isOjectEmpty, getDate, currentDate, getPrevDate, getNextDate, compareNextDate  } from '../../util/helper';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import Modal from '../../components/modal/Modal';
import Favourites from '../../components/favourites/Favourites';
import PreviewImages from '../../components/previewImages/PreviewImages';

import './home.css';

export default function HomeContainer() {
    
    const { loading, imageData, error, date, favouriteImages, previewImages } = useSelector(
        state => state.image
    );

    const [ selectedDate, setSelectedDate ] = useState(date);
    const [ showModal, setshowModal ] = useState(false);

    const dispatch = useDispatch();

    const handleChange = e => {
        const date = getDate(e.target.value)
        setSelectedDate(date);

        dispatch(getImageData(date));
    }

    const handlePrevDate = () => {
        const prevDate = getPrevDate(date);
        setSelectedDate(prevDate);

        dispatch(getImageData(prevDate));
    }

    const handleNextDate = () => {
        const nextDate = getNextDate(date);
        setSelectedDate(nextDate);

        dispatch(getImageData(nextDate));
    }

    const handleFavouriteToggle = () => {
        dispatch(toggleFavourite(date));
        dispatch(getImageData(date));
    }

    const viewFavouriteImage = (item) => {
        dispatch(getImageData(item));
        setSelectedDate(item);
        setshowModal(!showModal);
    }

    const removeFavouriteImage = (item) => {
        dispatch(toggleFavourite(item));
        dispatch(getFavourites());
        dispatch(getImageData(date));
    }

    const toggleModal = () => {
        setshowModal(!showModal);
        dispatch(getFavourites());
    }

    const deleteFavourites = () => {
        dispatch(removeFavourites());
        dispatch(getFavourites());
        dispatch(getImageData(date));
    }

    let imageName = "";
    let description = "";
    let imageUrl = "";
    let loaderOrError;
    let mediaIsVideo = false;
    let mediaType = "";
    let shouldClickNext = compareNextDate(date);

    if(loading){
        loaderOrError = <Loader customClass="loader"/>
    }

    if(error){
        loaderOrError = error;
    }

    if(!loading && !isOjectEmpty(imageData)){
        const { title, explanation, url, media_type } = imageData;
        imageName = title;
        description = explanation;
        mediaType = media_type;
        if (media_type === "image") imageUrl = url;
        if (media_type === "video") {
            mediaIsVideo = true;
            loaderOrError = (
                <div className="video-error">
                    <p>There's no image available to display</p>
                    <a href={url} target="_blank" rel="noopener noreferrer">Watch video</a>
                </div>
            )
        };
    }

    const favouriteImage = favouriteImages.find(image => image.date === selectedDate);

    //preview images
    let nextImageUrl = "";
    let nextImageType = "";
    let prevImageUrl = "";
    let prevImageType = "";

    if (!isOjectEmpty(previewImages)){
        const { next, prev } = previewImages;
        nextImageUrl = next && next.url;
        nextImageType = next && next.media_type;
        prevImageUrl = prev && prev.url;
        prevImageType = prev && prev.media_type;
    }

    const handlePreviewImages = useCallback(() => {
        dispatch(getPreviewImages(getPrevDate(date), 'prev'));
        if(shouldClickNext){
            dispatch(getPreviewImages(getNextDate(date), 'next'));
        }
    }, [date, dispatch, shouldClickNext])

    useEffect(() => {
        handlePreviewImages();
        dispatch(getFavourites());
        dispatch(getImageData(date));
    }, [dispatch, date, handlePreviewImages]);
    
    return (
        <div className="container home-page">
            <h4>{imageName}</h4>
            <div className="mb-4 picture-div">
                <Icon 
                    customClass="fas fa-chevron-left arrow"
                    handleClick={handlePrevDate}
                />
                <div className="image-container">
                    {
                        loading || error || mediaIsVideo?
                        loaderOrError
                        :
                        <img src={imageUrl} alt={imageName} className="img-fluid"/>
                    }
                </div>
                <Icon 
                    customClass={`fas fa-chevron-right arrow ${shouldClickNext ? '': 'opacity'}`}
                    handleClick={shouldClickNext ? handleNextDate : null}
                />
            </div>
            <PreviewImages
                prevImageType={prevImageType}
                prevImageUrl={prevImageUrl}
                mediaType={mediaType}
                imageUrl={imageUrl}
                nextImageType={nextImageType}
                nextImageUrl={nextImageUrl}
            />
            <div className="mb-5 favorite-date">
                <Icon 
                    customClass={favouriteImage ? "fas fa-heart heart red" : "far fa-heart heart"}
                    handleClick={loading || error ? null : handleFavouriteToggle}
                />
                <button className="btn btn-secondary" onClick={toggleModal}>View Favorites</button>
                <input type="date" value={selectedDate} onChange={handleChange} max={currentDate()}/>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
            <Modal show={showModal} toggleModal={toggleModal} >
                <Favourites 
                    favouriteImages={favouriteImages}
                    viewFavouriteImage={viewFavouriteImage}
                    removeFavouriteImage={removeFavouriteImage}
                    deleteFavourites={deleteFavourites}
                    toggleModal={toggleModal}
                />
            </Modal>
        </div>
    )
}
