// has state for all filters
// can open the filter modal
// displays 1 user + their dogs at a time with like or pass button

import React, {useState} from 'react';
import axios from 'axios';
import Filters from './Filters';
import ProfileView from './ProfileView';
import DogView from './DogView'

export default function Homepage({ currentUser, currentPhoto, currentDogs }) {
  const [filterModalOpen, toggleFilterModal] = useState(false);

  // Dog Filters
  const [sizes, changeSizes] = useState([]); // array of strings XS, S, M, L, XL
  const [dogMinAge, changeDogMinAge] = useState(0);
  const [dogMaxAge, changeDogMaxAge] = useState(20);
  const [dogGenders, changeDogGenders] = useState('both');
  const [hypoallergenic, changeHypoallergenic] = useState(false);
  const [neutered, changeNeutered] = useState(false);
  const [healthIssues, changeHealthIssues] = useState(false);
  const [avoidBreeds, changeAvoidedBreeds] = useState([]); // multi dropdown that adds/removes dog breed strings from this array

  // Owner Filters
  const [minDistance, changeMinDistance] = useState(1);
  const [maxDistance, changeMaxDistance] = useState(10); // miles
  const [ownerMinAge, changeOwnerMinAge] = useState(18);
  const [ownerMaxAge, changeOwnerMaxAge] = useState(100);
  const [ownerGenders, changeOwnerGenders] = useState('all');

  // Requests

  // GET request to get the user's initial settings on first login
  // GET request to get their most recent settings on subsequent logins
  // PUT/PATCH when the user clicks save/apply changes on the modal
  // GET 1 owner at a time + all their dogs, based on filters. Called on page load and on clicking X button for a user
  // PUT/PATCH the 'liked' table when clicking check button for a user.

  return (
    <div>
      <h3>Home Page</h3>
      <button onClick={() => toggleFilterModal(!filterModalOpen)}>Filters</button>
      {filterModalOpen ? <Filters /> : null}
      <ProfileView user={currentUser} dogs={currentDogs}/>
    </div>
  )
}