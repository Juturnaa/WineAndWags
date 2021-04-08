import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters';
import ProfileView from './ProfileVIew';
import DogView from './DogView';
import LikeButton from './LikeButton';
import Button from '@material-ui/core/Button';

export default function Homepage({
  currentUser, likeProfile, humanPhoto, currentDogs, getRandomUser, dogPhotos, likePhoto, currentUserID, potiential, potientialDog,
}) {
  const [filterModalOpen, toggleFilterModal] = useState(false);
  const [currentDog, setCurrentDog] = useState({});
  const [currentDogIndex, setCurrentDogIndex] = useState(0)
  useEffect(() => {
    setCurrentDog(potientialDog[currentDogIndex])
  }, [potientialDog, currentDogIndex])

  // Dog Filters
  const [sizeRange, changeSizeRange] = useState([1, 3]); // range represented by strings XS, S, M, L, XL
  const [dogAgeRange, changeDogAgeRange] = useState([0, 20]);
  const [dogGenders, changeDogGenders] = useState('Both');
  const [hypoallergenic, changeHypoallergenic] = useState(false);
  const [neutered, changeNeutered] = useState(false);
  const [healthIssues, changeHealthIssues] = useState(false);
  const [avoidBreeds, changeAvoidedBreeds] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  // const [preferredBreeds, changePreferredBreeds] = useState([]);

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
    if (currentDogIndex === currentDogs.length - 1) {
      setCurrentDogIndex(0)
    } else {
      setCurrentDogIndex(currentDogIndex + 1)
    }
  }


  const updateFilterParams = () => {
    const params = {
      sizeRange: getSizeRange(sizeRange[0], sizeRange[1]),
      dogGenders,
      dogAgeRange,
      hypoallergenic,
      neutered,
      healthIssues,
      avoidBreeds: avoidBreeds.join(','),
      maxDistance,
      ownerAgeRange,
      ownerGenders,
    };
    // setFilterParams(params);
    return params;
  };

  useEffect(() => {
    setFilterParams(updateFilterParams());
  }, [sizeRange])

  // GET request to get the user's settings
  useEffect(() => {
    axios.get(`/app/${currentUserID}/filters`)
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
      })
      .then(() => {
        const result = updateFilterParams();
        setFilterParams(result);
        getRandomUser(result);
      })
      .catch((err) => {
        console.error(error);
      });
  }, [currentUserID]);

  return (
    <div className='homepage'>
      <Button variant="contained" style={{width: '6rem', margin: '0.5rem'}} color="primary" onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</Button>
      <div className='potential-match-view'>
        <ProfileView user={potiential} photos={humanPhoto} likePhoto={likePhoto} />
        <DogView updateDogIndex={updateDogIndex} dog={currentDog || ''} dogPhotos={dogPhotos} likePhoto={likePhoto} />
      </div>
      <LikeButton likeProfile={likeProfile} filterParams={filterParams} getRandomUser={getRandomUser} />

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
