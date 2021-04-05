import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filters from './Filters';
import ProfileView from './ProfileView';
import DogView from './DogView'
import LikeButton from './LikeButton';

export default function Homepage({ currentUser, humanPhoto, currentDogs, getRandomUser }) {
  const [filterModalOpen, toggleFilterModal] = useState(false);
  const [currentDog, setCurrentDog] = useState({});
  useEffect(() => {
    setCurrentDog(currentDogs[0])
  }, [currentDogs])

  // Dog Filters
  const [sizeRange, changeSizeRange] = useState([1, 3]); // range represented by strings XS, S, M, L, XL
  const [dogAgeRange, changeDogAgeRange] = useState([0, 20]);
  const [dogGenders, changeDogGenders] = useState('Both');
  const [hypoallergenic, changeHypoallergenic] = useState(false);
  const [neutered, changeNeutered] = useState(false);
  const [healthIssues, changeHealthIssues] = useState(false);
  const [avoidBreeds, changeAvoidedBreeds] = useState([]);
  const [preferredBreeds, changePreferredBreeds] = useState([]);

  // Owner Filters
  const [maxDistance, changeMaxDistance] = useState(10); // miles
  const [ownerAgeRange, changeOwnerAgeRange] = useState([20, 50]);
  const [ownerGenders, changeOwnerGenders] = useState('All');

  // Requests

  // GET request to get the user's settings
  useEffect(() => {
    axios.get(`http://localhost:3000/app/${1}/filters`) // should be current user id, not 1
      .then((results) => {
        // modal slider for dog sizes works by number not strings
        const sizeToNumberValue = (str) => {
          if (str === 'XS') return 0
          if (str === 'S') return 1
          if (str === 'M') return 2
          if (str === 'L') return 3
          if (str === 'XL') return 4
        }
        const filters = results.data[0];
        changeSizeRange([sizeToNumberValue(filters.min_size), sizeToNumberValue(filters.max_size)]);
        changeDogAgeRange([filters.dog_min_age, filters.dog_max_age]);
        changeDogGenders(filters.dog_genders);
        changeHypoallergenic(filters.hypo);
        changeNeutered(filters.neutered);
        changeHealthIssues(filters.health_issues);
        changeAvoidedBreeds([filters.avoid_breeds]);
        changePreferredBreeds([filters.favorite_breeds]);
        changeMaxDistance(filters.max_dist);
        changeOwnerAgeRange([filters.min_age, filters.max_age]);
        changeOwnerGenders(filters.genders);
      })
      .catch((err) => {
        console.error(error);
      })
  }, [])

  return (
    <div>
      <h3>Home Page</h3>
      <button onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</button>
      <ProfileView user={currentUser} photos={humanPhoto}/>
      <DogView dog={currentDog || ''} />
      <LikeButton getRandomUser={getRandomUser} />
      {filterModalOpen ?
        <Filters
          sizeRange={sizeRange} changeSizeRange={changeSizeRange}
          dogAgeRange={dogAgeRange} changeDogAgeRange={changeDogAgeRange}
          dogGenders={dogGenders} changeDogGenders={changeDogGenders}
          hypoallergenic={hypoallergenic} changeHypoallergenic={changeHypoallergenic}
          neutered={neutered} changeNeutered={changeNeutered}
          healthIssues={healthIssues} changeHealthIssues={changeHealthIssues}
          avoidBreeds={avoidBreeds} changeAvoidedBreeds={changeAvoidedBreeds}
          preferredBreeds={preferredBreeds} changePreferredBreeds={changePreferredBreeds}
          maxDistance={maxDistance} changeMaxDistance={changeMaxDistance}
          ownerAgeRange={ownerAgeRange} changeOwnerAgeRange={changeOwnerAgeRange}
          ownerGenders={ownerGenders} changeOwnerGenders={changeOwnerGenders}
        /> : null}
    </div>
  )
}