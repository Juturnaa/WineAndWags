/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function EditHumanImage({ humanPhoto, indexHuman, setIndexHuman }) {
  const handleSelect = (selectedIndex, e) => {
    setIndexHuman(selectedIndex);
  };

  return (
    <Carousel interval={null} activeIndex={indexHuman} onSelect={handleSelect}>
      {humanPhoto.map((item, ind) => (
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

EditHumanImage.propTypes = {
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  setIndexHuman: PropTypes.func,
  indexHuman: PropTypes.number,
};

EditHumanImage.defaultProps = {
  humanPhoto: [],
  setIndexHuman: null,
  indexHuman: 0,
};

export default EditHumanImage;
