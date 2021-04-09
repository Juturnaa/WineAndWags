import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters';
import ProfileView from './ProfileVIew';
import DogView from './DogView';
import LikeButton from './LikeButton';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Homepage({
  currentUser, likeProfile, humanPhoto, currentDogs, getRandomUser, dogPhotos, likePhoto, currentUserID, potiential, potientialDog,
}) {
  const [filterModalOpen, toggleFilterModal] = useState(false);
  const [currentDog, setCurrentDog] = useState({});
  const [currentDogIndex, setCurrentDogIndex] = useState(0)
  const [isDisplayingSkipDogs, setIsDisplayingSkipDogs] = useState(0)
  useEffect(() => {
    // console.log('current dog index',currentDogIndex)
    // console.log('current Dogs',potientialDog)
    if (potientialDog.length > 1) {
      setIsDisplayingSkipDogs(true)
    } else {
      setIsDisplayingSkipDogs(false)
    }
    setCurrentDog(potientialDog[currentDogIndex])
  }, [potientialDog, currentDogIndex])
  useEffect(() => {
    setCurrentDogIndex(0)
  }, [potientialDog])

  useEffect(() => {
    
  }, [filterParams])

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
      setCurrentDogIndex(0)
    } else {
      setCurrentDogIndex(currentDogIndex + 1)
    }
  }

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
            zipCodes: '',
          }
          setFilterParams(params);
          getRandomUser(params);
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#EFF9F0"
      },
      secondary: {
        main: "#13070C"
      }
    },
  });

  return (
    <div className='homepage'>
      <ThemeProvider theme={theme}>
        <Button variant="contained" style={{ width: '6rem', margin: '0.5rem' }} color="primary" onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</Button>
      </ThemeProvider>
      <div className='potential-match-view'>
        <ProfileView user={potiential} photos={humanPhoto} likePhoto={likePhoto} />
        <DogView isDisplayingSkipDogs={isDisplayingSkipDogs} updateDogIndex={updateDogIndex} dog={currentDog || ''} dogPhotos={dogPhotos} likePhoto={likePhoto} />
      </div>
      <LikeButton user={potiential} setCurrentDogIndex={setCurrentDogIndex} likeProfile={likeProfile} filterParams={filterParams} getRandomUser={getRandomUser} />

      {filterModalOpen
        ? (
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
          />
        ) : null}
    </div>
  );
}
