import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData, selectDate } from '../../redux/actions';
import { isOjectEmpty, getDate, currentDate, getPrevDate, getNextDate, compareNextDate  } from '../../util/helper';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';

import './home.css';

export default function HomeContainer() {
    
    const { loading, imageData, error, date } = useSelector(
        state => state.image
    );

    const [ selectedDate, setSelectedDate ] = useState(date);
    const dispatch = useDispatch();

    const handleChange = e => {
        const date = getDate(e.target.value)
        setSelectedDate(date);

        dispatch(selectDate(date));
        dispatch(getImageData(date));
    }

    const handlePrevDate = () => {
        const prevDate = getPrevDate(date);
        setSelectedDate(prevDate);
        dispatch(selectDate(prevDate));

        dispatch(getImageData(prevDate));
    }

    const handleNextDate = () => {
        const nextDate = getNextDate(date);
        setSelectedDate(nextDate);
        dispatch(selectDate(nextDate));

        dispatch(getImageData(nextDate));
    }

    // console.log("loading", loading);
    // console.log("imageData", imageData);
    // console.log("error", error);
    // console.log("store date", date);
    // console.log("selected date", selectedDate);

    // console.log("empty object", isOjectEmpty({}))
    // console.log(compareNextDate(date));

    let imageName = "";
    let description = "";
    let imageUrl = "";
    let loaderOrError;
    let mediaIsVideo = false;
    let shouldClickNext = compareNextDate(date)

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

    useEffect(() => {
        dispatch(getImageData(date));
    }, [dispatch, date]);

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
                    customClass="far fa-heart heart"
                />
                <input type="date" value={selectedDate} onChange={handleChange} max={currentDate()}/>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
        </div>
    )
}
