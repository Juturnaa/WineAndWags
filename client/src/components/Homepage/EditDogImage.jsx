/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function EditDogImage({
  dogImages, id, setDogURL,
}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDogURL(dogImages[id][selectedIndex].id);
  };

  return (
    <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
      {dogImages[id].map((item, ind) => (
        <Carousel.Item key={ind}>
          <div style={{
            backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%',
          }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

EditDogImage.propTypes = {
  dogImages: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  id: PropTypes.number,
  setDogURL: PropTypes.func,
};

EditDogImage.defaultProps = {
  dogImages: {},
  id: null,
  setDogURL: null,
};

export default EditDogImage;
