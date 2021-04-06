/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function EditHumanImage({ humanImg, humanPhoto }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {humanPhoto.map((item, ind) => (
        <Carousel.Item key={ind}>
          <img src={item.url} alt="dog" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

EditHumanImage.propTypes = {
  humanImg: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

EditHumanImage.defaultProps = {
  humanImg: [],
  humanPhoto: [],
};

export default EditHumanImage;
