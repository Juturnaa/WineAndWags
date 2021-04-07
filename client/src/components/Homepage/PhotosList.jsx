import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import Carousel from 'react-bootstrap/Carousel';
import PhotoLikeButton from './PhotoLikeButton';

const PhotosList = ({ photos, likePhoto }) => {
  const [index, setIndex] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(1);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const changePages = (e, value) => {
    setCurrentPhoto(value);
  };

  
  return (
    <div className="img-container">
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {photos.map((item, ind) => (
          <Carousel.Item key={ind}>
            <div style={{
              backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%',
            }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {/* <img className="profile-pic" src={userPhotos[currentPhoto - 1].url} />
      <Pagination count={userPhotos.length} variant="outlined" page={currentPhoto} onChange={changePages} /> */}
      <PhotoLikeButton photoId={photos[index].id} likePhoto={likePhoto} />
      {/* {userPhotos[currentPhoto].map((photo) => (
                <img className="profile-pic" key={photo.id} src={photo.url} />
            ))} */}
    </div>
  );
};

export default PhotosList;
