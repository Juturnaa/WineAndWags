
import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function Filters({
  sizes, changeSizes,
  dogMinAge, changeDogMinAge,
  dogMaxAge, changeDogMaxAge,
  dogGenders, changeDogGenders,
  hypoallergenic, changeHypoallergenic,
  neutered, changeNeutered,
  healthIssues, changeHealthIssues,
  avoidBreeds, changeAvoidedBreeds,
  maxDistance, changeMaxDistance,
  ownerMinAge, changeOwnerMinAge,
  ownerMaxAge, changeOwnerMaxAge,
  ownerGenders, changeOwnerGenders
}) {

  return (
    <div>
      <Slider value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" />


      <button onClick={() => alert('PUT REQUEST')}>Apply</button>
    </div>
  )
}