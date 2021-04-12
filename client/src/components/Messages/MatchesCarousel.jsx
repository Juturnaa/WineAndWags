import React from 'react';
import Carousel from 'react-elastic-carousel';

const MatchesCarousel = ({
  matchesPhotos, matchesInfo, onMessageClick,
}) => {
  let humanPhoto = '';
  let dogPhoto = '';

  const getCarouselProfilePhotos = (matchPics) => {
    for (let i = 0; i < matchPics.length; i++) {
      if (matchPics[i].dog_id === null) {
        humanPhoto = matchPics[i].url;
        break;
      }
    }
    for (let j = 0; j < matchPics.length; j++) {
      if (matchPics[j].dog_id !== null) {
        dogPhoto = matchPics[j].url;
        break;
      }
    }
  };

  return (
    <div id="matches-container">
      <Carousel
        disableArrowsOnEnd
        itemsToShow={5}
        itemsToScroll={5}
        transitionMs={300}
      >
        {matchesPhotos.map((match, index) => (
          <div className="match-container">
            <div className="inbox-matches-names">
              {matchesInfo[match[0].user_id].name}
              {' '}
              and
              {' '}
              {matchesInfo[match[0].user_id].dogs_info[0].name}
            </div>
            <div className="match-photos-container">
              {getCarouselProfilePhotos(match)}
              <img
                className="human-photos"
                alt="human"
                src={humanPhoto}
                name={index}
                onClick={onMessageClick}
              />
              <img
                className="dog-photos"
                alt="dog"
                src={dogPhoto}
                name={index}
                onClick={onMessageClick}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MatchesCarousel;
