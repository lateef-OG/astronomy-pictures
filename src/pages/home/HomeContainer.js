import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData } from '../../redux/actions';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';

import './home.css';

export default function HomeContainer() {
    const dispatch = useDispatch();
    
    const { loading, imageData, error } = useSelector(
        state => state.image
    );

    console.log("loading", loading);
    console.log("imageData", imageData);
    console.log("error", error);
    
    useEffect(() => {
        dispatch(getImageData());
    }, [dispatch]);

    return (
        <div className="container home-page">
            <h2 className="mb-4">NASA picture of the day</h2>
            <h4 className="mb-2">Title</h4>
            <div className="mb-4 picture-div">
                <Icon 
                    customClass="fas fa-chevron-left arrow"
                />
                <div className="image-container">
                    {/* <img src="" alt=""/> */}
                    <Loader customClass="loader"/>
                </div>
                <Icon 
                    customClass="fas fa-chevron-right arrow"
                />
            </div>
            <div className="mb-5 favorite-date">
                <Icon 
                    customClass="far fa-heart heart"
                />
                <input type="date"/>
            </div>
            <div className="description">
                <p>This is a short description.</p>
            </div>
        </div>
    )
}
