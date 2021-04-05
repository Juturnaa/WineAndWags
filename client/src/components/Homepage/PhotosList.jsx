import React from 'react';

const PhotosList = ({ photos }) => {
    return (
        <div>
            {photos.map((photo) => (
                <img className="profile-pic" key={photo.id} src={photo.url} />
            ))}
        </div>
    )
}

export default PhotosList;