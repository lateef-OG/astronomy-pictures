import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData, selectDate} from '../../redux/actions';
import { isOjectEmpty, getDate, currentDate  } from '../../util/helper';
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

    // console.log("loading", loading);
    console.log("imageData", imageData);
    // console.log("error", error);
    // console.log("date", date);

    // console.log("empty object", isOjectEmpty({}))
    let imageName = "";
    let description = "";
    let imageUrl = "";
    let loaderOrError;
    let mediaIsVideo = false;

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
                    <a href={url} target="_blank">Watch video</a>
                </div>
            )
        };
    }

    useEffect(() => {
        dispatch(getImageData(date));
    }, [dispatch]);

    return (
        <div className="container home-page">
            <h2 className="mb-4">NASA picture of the day</h2>
            <h4 className="mb-2">{imageName}</h4>
            <div className="mb-4 picture-div">
                <Icon 
                    customClass="fas fa-chevron-left arrow"
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
                    customClass="fas fa-chevron-right arrow"
                />
            </div>
            <div className="mb-5 favorite-date">
                <Icon 
                    customClass="far fa-heart heart"
                />
                <input type="date" value={selectedDate} onChange={handleChange}/>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
        </div>
    )
}
