import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData, toggleFavourite, getFavouriteImages, removeFavourites } from '../../redux/actions';
import { isOjectEmpty, getDate, currentDate, getPrevDate, getNextDate, compareNextDate  } from '../../util/helper';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import Modal from '../../components/modal/Modal';
import Favourites from '../../components/favourites/Favourites';

import './home.css';

export default function HomeContainer() {
    
    const { loading, imageData, error, date, favouriteImages } = useSelector(
        state => state.image
    );

    const [ selectedDate, setSelectedDate ] = useState(date);
    const [ showModal, setshowModal ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavouriteImages());
        dispatch(getImageData(date));
    }, [dispatch, date]);

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
        dispatch(getFavouriteImages());
        dispatch(getImageData(date));
    }

    const toggleModal = () => {
        setshowModal(!showModal);
        dispatch(getFavouriteImages());
    }

    const deleteFavourites = () => {
        dispatch(removeFavourites());
        dispatch(getFavouriteImages());
        dispatch(getImageData(date));
    }

    let imageName = "";
    let description = "";
    let imageUrl = "";
    let loaderOrError;
    let mediaIsVideo = false;
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
    
    return (
        <div className="container home-page">
            <h2 className="mb-4">NASA picture of the day</h2>
            <h4 className="mb-2">{imageName}</h4>
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
                        <img src={imageUrl} alt={imageName}/>
                    }
                </div>
                <Icon 
                    customClass={`fas fa-chevron-right arrow ${shouldClickNext ? '': 'opacity'}`}
                    handleClick={shouldClickNext ? handleNextDate : null}
                />
            </div>
            <div className="mb-5 favorite-date">
                <Icon 
                    customClass={favouriteImage ? "fas fa-heart heart red" : "far fa-heart heart"}
                    handleClick={loading || error ? null : handleFavouriteToggle}
                />
                <button className="btn btn-secondary ml-2" onClick={toggleModal}>View Favorites</button>
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
