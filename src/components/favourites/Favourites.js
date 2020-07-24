import React from 'react';
import ImageCard from '../imageCard/ImageCard';

import './favourites.css';

const Favourites = ({ favouriteImages, viewFavouriteImage, removeFavouriteImage, deleteFavourites, toggleModal }) => {
    return (
        <div className="favourites">
            <h4>Favourite Images</h4>
            {
                favouriteImages.length > 0 ?
                <React.Fragment>
                    {
                        favouriteImages.map(image => {
                            const { date } = image;
                            return (
                                <ImageCard
                                    key={date}
                                    imageData={image}
                                    viewImage={viewFavouriteImage}
                                    removeImage={removeFavouriteImage}
                                />
                            )
                        })
                    }

                    <div className="no-favourites">
                        <button className="btn btn-danger" onClick={deleteFavourites}>Delete All</button>
                    </div>
                </React.Fragment>
                :
                <div className="no-favourites">
                    <p>No Favourite images</p>
                    <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
                </div>
            }
        </div>
    )
}

export default Favourites;