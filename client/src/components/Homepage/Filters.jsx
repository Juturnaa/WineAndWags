
import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function Filters({
  sizes, changeSizes,
  dogAgeRange, changeDogAgeRange,
  dogGenders, changeDogGenders,
  hypoallergenic, changeHypoallergenic,
  neutered, changeNeutered,
  healthIssues, changeHealthIssues,
  avoidBreeds, changeAvoidedBreeds,
  maxDistance, changeMaxDistance,
  ownerAgeRange, changeOwnerAgeRange,
  ownerGenders, changeOwnerGenders
}) {

  return (
    <div>
      <h5>Owner</h5>
      <p>Max Distance {maxDistance}</p>
      <Slider value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" min={0} max={50}/>
      <p>Age Range {ownerAgeRange[0]}-{ownerAgeRange[1]}</p>
      <Slider value={ownerAgeRange} onChange={(e, val) => changeOwnerAgeRange(val)} aria-labelledby="range-slider" min={18} max={100} />

      <p>Genders</p>
      <h5>Dog</h5>
      <button onClick={() => alert('PUT REQUEST')}>Apply</button>
    </div>
  )
}