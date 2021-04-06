/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function EditDogImage({ dogImages, id }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
      {dogImages[id].map((item, ind) => (
        <Carousel.Item key={ind}>
          <img src={item.url} alt="dog" />
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
};

EditDogImage.defaultProps = {
  dogImages: {},
  id: null,
};

export default EditDogImage;
