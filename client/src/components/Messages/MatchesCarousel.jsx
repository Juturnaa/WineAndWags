import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const MatchesCarousel = ({
  matchesPhotos, matchesInfo, onMessageClick, messageQueueCount,
}) => {
  const [matchIndex, setMatchIndex] = useState(0);

  const handleMatchSelect = (selectedIndex) => {
    setMatchIndex(selectedIndex);
  };
  // const mapMatchesPhotos = () => {
  //   matchesPhotos.map((match, index) => {
  //   // display 6 matches at a time -> replace this with carousel
  //     if (index < 6) {
  //       return (
  //         <div className="match-container" key={match[0].user_id}>
  //           {/* {console.log('match info:', matchesInfo)} */}
  //           <div>
  //             {matchesInfo[match[0].user_id].name}
  //             {' '}
  //             and
  //             {' '}
  //             {matchesInfo[match[0].user_id].dogs_info[0].name}
  //           </div>
  //           <br />
  //           <div className="match-photos-container">
  //             <img
  //               className="human-photos"
  //               alt="human"
  //               src={match[0].url}
  //               name={index}
  //               onClick={onMessageClick}
  //             />
  //             <img
  //               className="dog-photos"
  //               alt="dog"
  //               src={match[1].url}
  //               name={index}
  //               onClick={onMessageClick}
  //             />
  //           </div>
  //         </div>
  //       );
  //     }
  //   });
  // };

  return (
    <div id="matches-container">
      <Carousel
        interval={null}
        activeIndex={matchIndex}
        onSelect={handleMatchSelect}
        style={{
          height: '130px',
        }}
      >
        {matchesPhotos.map((match, index) => (
          <Carousel.Item>
            <div className="match-container">
              {/* {console.log('match info:', matchesInfo)} */}
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
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MatchesCarousel;
