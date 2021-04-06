import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Inbox = ({ matches, matchesPhotos }) => {
  console.log('matches', matches);
  console.log('matchesPhotos', matchesPhotos);
  // getMatchPhotos = () => {
  // };

  // useEffect(() => {
  //   // console.log('matches', matches);
  //   // const fetchData = async () => {
  //   //   const data = await getMatchPhotos();
  //   //   setMatches(data);
  //   const matchPhotos = [];
  //   matches.map((match) => axios.get(`/app/users/photos/${match.user_id}`)
  //     .then((results) => {
  //       matchPhotos.push(results.data);
  //     })
  //     .catch((err) => console.log(err)));
  //   setMatches(matchPhotos);
  //   // };
  //   // fetchData();
  // }, [setMatches]);

  return (
    <div id="inbox-container">
      <br />
      <div id="matches-container">
        {matchesPhotos.map((match) => (
          <div className="match-container" key={match[0].user_id}>
            <span>Human and Dog</span>
            <br />
            <div className="match-photos-container">
              <img
                className="human-photos"
                alt="human"
                src={match[0].url}
              />
              <img
                className="dog-photos"
                alt="dog"
                src={match[1].url}
              />
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div id="messages-container">
        Inbox HERE:
        <div>
          Map through messages here
        </div>
      </div>
    </div>
  );
};

Inbox.propTypes = {
  currentUser: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  dogsImg: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matches: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matchesPhotos: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

Inbox.defaultProps = {
  currentUser: {},
  dogsImg: [],
  humanPhoto: [],
  matches: [],
  matchesPhotos: [],
};

export default Inbox;
