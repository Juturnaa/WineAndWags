// has state for all filters
// can open the filter modal
// displays 1 user + their dogs at a time with like or pass button

import React, {useState} from 'react';
import axios from 'axios';
import Filters from './Filters';

export default function Homepage() {
  const [filterModalOpen, toggleFilterModal] = useState(false);

  // Dog Filters
  const [sizes, changeSizes] = useState([]); // array of strings XS, S, M, L, XL
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
  // PUT/PATCH user settings when they click save/apply changes on the modal

  // GET 1 owner at a time + all their dogs, based on filters. Called on page load and on clicking X button for a user
  // PUT/PATCH the 'liked' table when clicking check button for a user.

  return (
    <div>
      <h3>Home Page</h3>
      <button onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</button>
      {filterModalOpen ?
        <Filters
          sizes={sizes} changeSizes={changeSizes}
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