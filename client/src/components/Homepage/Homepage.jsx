import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Filters from './Filters';
import ProfileView from './ProfileVIew';
import DogView from './DogView';
import LikeButton from './LikeButton';
import zipcodes from '../../dummyData/zipcodes';

export default function Homepage({
  currentUser, likeProfile, potientialPhoto, currentDogs, potientialDogsImg, getRandomUser, dogPhotos, likePhoto, currentUserID, potiential, potientialDog,
}) {
  const [filterModalOpen, toggleFilterModal] = useState(false);
  const [currentDog, setCurrentDog] = useState({});
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isDisplayingSkipDogs, setIsDisplayingSkipDogs] = useState(0);
  useEffect(() => {
    if (potientialDog.length > 1) {
      setIsDisplayingSkipDogs(true);
    } else {
      setIsDisplayingSkipDogs(false);
    }
    setCurrentDog(potientialDog[currentDogIndex]);
  }, [potientialDog, currentDogIndex]);
  useEffect(() => {
    setCurrentDogIndex(0);
  }, [potientialDog]);

  useEffect(() => {

  }, [filterParams]);

  // Dog Filters
  const [sizeRange, changeSizeRange] = useState([1, 3]); // range represented by strings XS, S, M, L, XL
  const [dogAgeRange, changeDogAgeRange] = useState([0, 20]);
  const [dogGenders, changeDogGenders] = useState('Both');
  const [hypoallergenic, changeHypoallergenic] = useState(false);
  const [neutered, changeNeutered] = useState(false);
  const [healthIssues, changeHealthIssues] = useState(false);
  const [avoidBreeds, changeAvoidedBreeds] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  // Owner Filters
  const [maxDistance, changeMaxDistance] = useState(10); // miles
  const [ownerAgeRange, changeOwnerAgeRange] = useState([20, 50]);
  const [ownerGenders, changeOwnerGenders] = useState('F');
  const [zipCodes, changeZipCodes] = useState([]);

  const [alert, showAlert] = useState(false); // instead of using alert()
  useEffect(() => {
    if (alert) {
      setTimeout(() => { showAlert(false); }, 3000);
    }
  }, [alert]);

  // Requests

  // transforming data to work with filter params for get random profile
  const getSizeRange = (min, max) => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push(`'${sizes[i]}'`);
    }
    return result.join(',');
  };

  const updateDogIndex = () => {
    if (currentDogIndex === potientialDog.length - 1) {
      setCurrentDogIndex(0);
    } else {
      setCurrentDogIndex(currentDogIndex + 1);
    }
  };

  // GET request to get the user's settings
  useEffect(() => {
    if (currentUser.id) {
      axios.get(`/app/${currentUser.id}/filters`)
        .then((results) => {
          // modal slider for dog sizes works by number not strings
          const sizeToNumberValue = (str) => {
            if (str === 'XS') return 0;
            if (str === 'S') return 1;
            if (str === 'M') return 2;
            if (str === 'L') return 3;
            if (str === 'XL') return 4;
          };
          const filters = results.data[0];
          changeSizeRange([sizeToNumberValue(filters.min_size), sizeToNumberValue(filters.max_size)]);
          changeDogAgeRange([filters.dog_min_age, filters.dog_max_age]);
          changeDogGenders(filters.dog_genders);
          changeHypoallergenic(filters.hypo);
          changeNeutered(filters.neutered);
          changeHealthIssues(filters.health_issues);
          changeAvoidedBreeds([filters.avoid_breeds]);
          changeMaxDistance(filters.max_dist);
          changeOwnerAgeRange([filters.min_age, filters.max_age]);
          changeOwnerGenders(filters.genders);

          // request for zip codes based on currentUser zip and filters.max_dist, then use them as params and state
          const options = {
            method: 'GET',
            url: 'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius',
            params: { zipcode: currentUser.zipcode, maximumradius: filters.max_dist, key: 'R9NC7P6CVW7RDGU10LKR' },
          };
          axios.request(options)
            .then((response) => {
              let uniqueZips = [];
              // hardcode list of zips if api key is out
              if (response.data.Error === "Credit limit has been reached.") {
                for (const zip of zipcodes) {
                  uniqueZips.push(`'${zip}'`);
                }
              } else {
                for (const item of response.data.DataList) {
                  if (!uniqueZips.includes(item.Code)) {
                    uniqueZips.push(`'${item.Code}'`);
                  }
                }
              }
              changeZipCodes(uniqueZips.join(','));
              const params = {
                sizeRange: getSizeRange(sizeToNumberValue(filters.min_size), sizeToNumberValue(filters.max_size)),
                dogGenders: filters.dog_genders,
                dogAgeRange: [filters.dog_min_age, filters.dog_max_age],
                hypoallergenic: filters.hypo,
                neutered: filters.neutered,
                healthIssues: filters.health_issues,
                avoidBreeds: filters.avoid_breeds,
                ownerAgeRange: [filters.min_age, filters.max_age],
                ownerGenders: filters.genders,
                zipCodes: uniqueZips.join(','),
              };
              setFilterParams(params);
              getRandomUser(params);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#EFF9F0',
      },
      secondary: {
        main: '#13070C',
      },
    },
  });

  return (
    <div className="homepage">
      <div className="filter-btn">
        <ThemeProvider theme={theme}>
          <Button variant="contained" style={{ width: '6rem', margin: '0.5rem' }} color="primary" onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</Button>
        </ThemeProvider>
        {alert ? <div className="filter-alert">UPDATED PREFERENCES</div> : null}
      </div>
      <div className="potential-match-view">
        <ProfileView user={potiential} photos={potientialPhoto} likePhoto={likePhoto} />
        <DogView potientialDogsImg={potientialDogsImg} isDisplayingSkipDogs={isDisplayingSkipDogs} updateDogIndex={updateDogIndex} dog={currentDog || ''} dogPhotos={dogPhotos} likePhoto={likePhoto} />
      </div>
      <LikeButton user={potiential} setCurrentDogIndex={setCurrentDogIndex} likeProfile={likeProfile} filterParams={filterParams} getRandomUser={getRandomUser} />
      {filterModalOpen
        ? (
          <div className="filter-container">
            <div className="arrowhead" />
            <Filters
              sizeRange={sizeRange}
              changeSizeRange={changeSizeRange}
              dogAgeRange={dogAgeRange}
              changeDogAgeRange={changeDogAgeRange}
              dogGenders={dogGenders}
              changeDogGenders={changeDogGenders}
              hypoallergenic={hypoallergenic}
              changeHypoallergenic={changeHypoallergenic}
              neutered={neutered}
              changeNeutered={changeNeutered}
              healthIssues={healthIssues}
              changeHealthIssues={changeHealthIssues}
              avoidBreeds={avoidBreeds}
              changeAvoidedBreeds={changeAvoidedBreeds}
              maxDistance={maxDistance}
              changeMaxDistance={changeMaxDistance}
              ownerAgeRange={ownerAgeRange}
              changeOwnerAgeRange={changeOwnerAgeRange}
              ownerGenders={ownerGenders}
              changeOwnerGenders={changeOwnerGenders}
              close={toggleFilterModal}
              setFilterParams={setFilterParams}
              currentUserID={currentUserID}
              currentUser={currentUser}
              potiential={potiential}
              showAlert={showAlert}
              zipCodes={zipCodes}
              changeZipCodes={changeZipCodes}
              getRandomUser={getRandomUser}
            />
          </div>
        ) : null}
    </div>
  );
}