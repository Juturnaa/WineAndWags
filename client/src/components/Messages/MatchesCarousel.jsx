import React from 'react';
import Carousel from 'react-elastic-carousel';

const MatchesCarousel = ({
  matchesPhotos, matchesInfo, onMessageClick,
}) => (
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
            <img
              className="human-photos"
              alt="human"
              src={match[0].url}
              name={index}
              onClick={onMessageClick}
            />
            <img
              className="dog-photos"
              alt="dog"
              src={match[1].url}
              name={index}
              onClick={onMessageClick}
            />
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default MatchesCarousel;
