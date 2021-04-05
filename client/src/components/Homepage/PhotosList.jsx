import React from 'react';

const PhotosList = ({ photos }) => {
    return (
        <div>
            <img className="profile-pic"  src={"https://i.insider.com/5760644fdd089549108b4976?width=1100&format=jpeg&auto=webp"} />
            {/* {photos.map((photo) => (
                <img className="profile-pic" key={photo.id} src={photo.url} />
            ))} */}
        </div>
    )
}

export default PhotosList;