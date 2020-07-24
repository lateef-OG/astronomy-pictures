import React from 'react';
import PropTypes from 'prop-types';


const PreviewImages = ({prevImageType, prevImageUrl, mediaType, imageUrl, nextImageType, nextImageUrl}) => {
    return (
        <div className="preview-images">
            <div className="preview-image">
                {
                    prevImageType === "image" ?
                        <img src={prevImageUrl} alt="previous day" />
                        :
                        <p>No image</p>
                }
            </div>
            <div className="preview-image active">
                {
                    mediaType === "image" ?
                        <img src={imageUrl} alt="today" />
                        :
                        <p>...</p>
                }
            </div>
            <div className="preview-image">
                {
                    nextImageType === "image" ?
                        <img src={nextImageUrl} alt="next day" />
                        :
                        <p>No image</p>
                }
            </div>
        </div>
    )
}

PreviewImages.propTypes = {
    prevImageType: PropTypes.string,
    prevImageUrl: PropTypes.string,
    mediaType: PropTypes.string,
    imageUrl: PropTypes.string,
    nextImageType: PropTypes.string,
    nextImageUrl: PropTypes.string
}

export default PreviewImages;