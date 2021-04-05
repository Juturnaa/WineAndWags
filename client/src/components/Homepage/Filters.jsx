
import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Filters({
  sizeRange, changeSizeRange,
  dogAgeRange, changeDogAgeRange,
  dogGenders, changeDogGenders,
  hypoallergenic, changeHypoallergenic,
  neutered, changeNeutered,
  healthIssues, changeHealthIssues,
  avoidBreeds, changeAvoidedBreeds,
  preferredBreeds, changePreferredBreeds,
  maxDistance, changeMaxDistance,
  ownerAgeRange, changeOwnerAgeRange,
  ownerGenders, changeOwnerGenders
}) {

  // replace with whatever full list of breeds all of us end up using
  const breeds = ['pug', 'goldendoodle', 'golden retriever', 'bulldog', 'beagle', 'rottweiler', 'corgi']

  // XS, S, M, L, XL
  const sizeLabels = [
    {
      value: 0,
      label: 'XS',
    },
    {
      value: 1,
      label: 'S',
    },
    {
      value: 2,
      label: 'M',
    },
    {
      value: 3,
      label: 'L',
    },
    {
      value: 4,
      label: 'XL',
    }
  ];

  // for sending to DB
  const sizeValuesToStrings = (first, second) => {
    return [sizeLabels[first].label, sizeLabels[second].label]
  }

  const displaySizeRangeAsString = (first, second) => {
    return `${sizeLabels[first].label} - ${sizeLabels[second].label}`
  }

  const sliderStyle = {
    width: '50%'
  }

  return (
    <div className='filter-modal'>
      <div className='dog-filters'>
        <h3>Dog</h3>
        <p>Age Range: {dogAgeRange[0]}-{dogAgeRange[1]}</p>
        <Slider style={sliderStyle} value={dogAgeRange} onChange={(e, val) => changeDogAgeRange(val)} aria-labelledby="range-slider" min={0} max={20} />
        <p>Size Range: {displaySizeRangeAsString(sizeRange[0], sizeRange[1])}</p>
        <Slider style={sliderStyle}
          value={sizeRange}
          onChange={(e, val) => changeSizeRange(val)}
          marks={sizeLabels}
          step={1}
          min={0}
          max={4}
        />
        <p>Genders</p>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="gender_dog" value={dogGenders} onChange={(e, val) => changeDogGenders(val)}>
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="Both" control={<Radio />} label="Both" />
          </RadioGroup>
        </FormControl>
        <p>Information</p>
        <FormControlLabel
          control={<Checkbox checked={hypoallergenic} onChange={() => changeHypoallergenic(!hypoallergenic)} name="hypoallergenic" />}
          label="Hypoallergenic"
        />
        <FormControlLabel
          control={<Checkbox checked={neutered} onChange={() => changeNeutered(!neutered)} name="neutered" />}
          label="Neutered/Spayed"
        />
        <FormControlLabel
          control={<Checkbox checked={healthIssues} onChange={() => changeHealthIssues(!healthIssues)} name="healthIssues" />}
          label="Health issues"
        />
        <p>Breeds:</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{marginRight: '1rem'}}>Avoid</p>
          <FormControl>
            <Select
              multiple
              value={avoidBreeds}
              onChange={(e) => changeAvoidedBreeds(e.target.value)}
              input={<Input />}
              style={{marginRight: '1rem'}}
            >
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p style={{marginRight: '1rem'}}>Prefer</p>
          <FormControl>
            <Select
              multiple
              value={preferredBreeds}
              onChange={(e) => changePreferredBreeds(e.target.value)}
              input={<Input />}
            >
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='owner-filters'>
        <h3>Owner</h3>
        <p>Age Range: {ownerAgeRange[0]}-{ownerAgeRange[1]}</p>
        <Slider style={sliderStyle} value={ownerAgeRange} onChange={(e, val) => changeOwnerAgeRange(val)} aria-labelledby="range-slider" min={18} max={100} />
        <p>Max Distance: {maxDistance}</p>
        <Slider style={sliderStyle} value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" min={0} max={50} />
        <p>Genders</p>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="gender_owner" value={ownerGenders} onChange={(e, val) => changeOwnerGenders(val)}>
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="All" control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
        <button className='apply-btn' onClick={() => alert('PUT REQUEST')}>Apply changes</button>
      </div>
    </div>
  )
}