import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import Carousel from 'react-bootstrap/Carousel';
import PhotoLikeButton from './PhotoLikeButton';
import CircularProgress from '@material-ui/core/CircularProgress';


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
            <Carousel id="carouselProfile" style={{border: 'solid 1px #13070C', borderRadius:"15px 15px 0 0"}} interval={null} activeIndex={index} onSelect={handleSelect}>
              {photos.map((item, ind) => (
                <Carousel.Item key={ind}>
                  <div style={{
                    backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', borderRadius:"15px 15px 0 0"
                  }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <PhotoLikeButton photoId={photos[index].id} likePhoto={likePhoto} />
          </div>
        )
        : <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}><CircularProgress color="secondary" /></div>}

    </div>
  );
};

export default PhotosList;


// [{[{}]}, {[{}]}, {[{}]}, {[{}]}]