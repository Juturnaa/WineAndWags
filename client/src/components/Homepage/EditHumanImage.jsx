/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function EditHumanImage({ humanPhoto, setHumanURL, index, setIndex }) {
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setHumanURL(humanPhoto[selectedIndex].id);
  };

  return (
    <Carousel className="editCarousel" interval={null} activeIndex={index} onSelect={handleSelect}>
      {humanPhoto.map((item, ind) => (
        <Carousel.Item key={ind} value={item.url}>
          <div
            style={{
              backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%',
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

EditHumanImage.propTypes = {
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  setHumanURL: PropTypes.func,
};

EditHumanImage.defaultProps = {
  humanPhoto: [],
  setHumanURL: null,
};

export default EditHumanImage;
