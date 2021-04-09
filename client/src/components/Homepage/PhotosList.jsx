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
      {photos[0]
        ? (
          <div>
            {' '}
            <Carousel id="carouselProfile" interval={null} activeIndex={index} onSelect={handleSelect}>
              {photos.map((item, ind) => (
                <Carousel.Item key={ind}>
                  <div style={{
                    backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', borderRadius: '5%'
                  }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <PhotoLikeButton photoId={photos[index].id} likePhoto={likePhoto} />
          </div>
        )
        : null}

    </div>
  );
};

export default PhotosList;


// [{[{}]}, {[{}]}, {[{}]}, {[{}]}]