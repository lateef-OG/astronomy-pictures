import React from 'react';

import './home.css';

export default function HomeContainer() {
    return (
        <div className="container home-page">
            <h2 className="mb-4">Nasa picture of the day</h2>
            <h4 className="mb-2">Title</h4>
            <div className="mb-4 picture-div">
                <i className="fas fa-chevron-left arrow" />
                <div className="image-container">
                <img src="" alt=""/>
                </div>
                <i className="fas fa-chevron-right arrow" />
            </div>
            <div className="mb-5 favorite-date">
                <i className="far fa-heart heart" />
                <input type="date"/>
            </div>
            <div className="description">
                <p>This is a short description.</p>
            </div>
        </div>
    )
}
