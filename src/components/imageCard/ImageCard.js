import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import './imageCard.css';

const ImageCard = ({ imageData, removeImage, viewImage }) => {
    const { title, date, url, media_type } = imageData
    return (
        <div className="image-card">
            <div className="image-container">
                {
                    media_type === 'image'?
                    <img src={url} alt={title} />
                    :
                    <p>No Image</p>
                }
            </div>
            <div className="details">
                <h5>{title}</h5>
                <div>
                    <button className="btn btn-primary mr-2" onClick={() => viewImage(date)}>View</button>
                    <button className="btn btn-danger" onClick={() => removeImage(date)}>
                        <Icon customClass="fas fa-trash" />
                    </button>
                </div>
            </div>
        </div>
    )
}

ImageCard.propType = {
    imageData: PropTypes.object,
    removeImage: PropTypes.func,
    viewImage: PropTypes.func,
}

export default ImageCard;
