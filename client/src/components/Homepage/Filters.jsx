
import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
      <Slider value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" min={0} max={50} />
      <p>Age Range {ownerAgeRange[0]}-{ownerAgeRange[1]}</p>
      <Slider value={ownerAgeRange} onChange={(e, val) => changeOwnerAgeRange(val)} aria-labelledby="range-slider" min={18} max={100} />
      <p>Genders {ownerGenders}</p>
      <FormControl component="fieldset">
        <RadioGroup row aria-label="gender" name="gender1" value={ownerGenders} onChange={(e, val) => changeOwnerGenders(val)}>
          <FormControlLabel value="M" control={<Radio />} label="Male" />
          <FormControlLabel value="F" control={<Radio />} label="Female" />
          <FormControlLabel value="All" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>
      <h5>Dog</h5>
      <button onClick={() => alert('PUT REQUEST')}>Apply</button>
    </div>
  )
}