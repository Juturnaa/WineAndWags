import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import breeds from '../../dummyData/dogBreed';
import zipcodes from '../../dummyData/zipcodes';


export default function Filters({
  sizeRange, changeSizeRange,
  dogAgeRange, changeDogAgeRange,
  dogGenders, changeDogGenders,
  hypoallergenic, changeHypoallergenic,
  neutered, changeNeutered,
  healthIssues, changeHealthIssues,
  avoidBreeds, changeAvoidedBreeds,
  maxDistance, changeMaxDistance,
  ownerAgeRange, changeOwnerAgeRange,
  ownerGenders, changeOwnerGenders,
  close, setFilterParams,
  currentUser, currentUserID,
  potiential, showAlert,
  zipCodes, changeZipCodes,
  getRandomUser
}) {
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
    },
  ];

  const displaySizeRangeAsString = (first, second) => {
    if (first !== undefined && second !== undefined) {
      return `${sizeLabels[first].label} - ${sizeLabels[second].label}`;
    }
  };

  const sliderStyle = {
    width: '50%',
  };

  // transforming data to work with filter params for get random profile
  const getSizeRange = (min, max) => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push(`'${sizes[i]}'`);
    }
    return result.join(',');
  };

  // PATCH user settings
  const saveChanges = () => {
    const sizeNumToString = (n) => {
      if (n === 0) return 'XS';
      if (n === 1) return 'S';
      if (n === 2) return 'M';
      if (n === 3) return 'L';
      if (n === 4) return 'XL';
    };
    const values = {
      sizeRange: [sizeNumToString(sizeRange[0]), sizeNumToString(sizeRange[1])],
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

    axios.patch(`app/${currentUserID}/filters`, values)
      .then((results) => {
        updateFilterParams();
        close(false);
        showAlert(true);
      })
      .catch((err) => console.error(err));
  };

  const updateFilterParams = () => {
    // request for zip codes based on currentUser zip and maxDistance slider
    const options = {
      method: 'GET',
      url: 'https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius',
      params: { zipcode: currentUser.zipcode, maximumradius: maxDistance, key: 'AAOQMTRST8WJ41JRKG5L' },
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
          sizeRange: getSizeRange(sizeRange[0], sizeRange[1]),
          dogGenders,
          dogAgeRange,
          hypoallergenic,
          neutered,
          healthIssues,
          avoidBreeds: avoidBreeds.join(','),
          zipCodes: uniqueZips.join(','),
          ownerAgeRange,
          ownerGenders,
        };
        setFilterParams(params);
        getRandomUser(params);
      });
  };

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
    <div className="filter-modal">
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => close(false)} color="secondary" aria-label="close-filter-modal"><CancelIcon /></IconButton>
        </div>
        <div className="filter-modal-inner">
          <div className="owner-filters">
            <Typography variant="h4" gutterBottom>Owner</Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Age range:
              {' '}
              {ownerAgeRange[0]}
              -
              {ownerAgeRange[1]}
            </Typography>
            <Slider color="primary" style={sliderStyle} value={ownerAgeRange} onChange={(e, val) => changeOwnerAgeRange(val)} aria-labelledby="range-slider" min={18} max={100} />
            <Typography variant="overline" display="block" gutterBottom>
              Max distance:
              {' '}
              {maxDistance}
              {' '}
              miles
            </Typography>
            <Slider style={sliderStyle} value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" min={0} max={50} />
            <div style={{ padding: 0, marginTop: '1.25rem' }}>
              <Typography variant="overline" display="block" gutterBottom>Genders</Typography>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="gender" name="gender_owner" value={ownerGenders} onChange={(e, val) => changeOwnerGenders(val)}>
                  <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" />
                  <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />
                  <FormControlLabel value="All" control={<Radio color="primary" />} label="All" />
                </RadioGroup>
              </FormControl>
            </div>
            <Button variant="contained" style={{ width: '10rem', marginTop: '2.5rem' }} color="primary" onClick={() => saveChanges()}>Apply changes</Button>

          </div>
          <div className="dog-filters">
            <Typography variant="h4" gutterBottom>Dog</Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Age range:
              {' '}
              {dogAgeRange[0]}
              -
              {dogAgeRange[1]}
            </Typography>
            <Slider style={sliderStyle} value={dogAgeRange} onChange={(e, val) => changeDogAgeRange(val)} aria-labelledby="range-slider" min={0} max={30} />
            <Typography variant="overline" display="block" gutterBottom>
              Size range:
              {' '}
              {displaySizeRangeAsString(sizeRange[0], sizeRange[1])}
            </Typography>
            <Slider
              style={sliderStyle}
              value={sizeRange}
              onChange={(e, val) => changeSizeRange(val)}
              marks={sizeLabels}
              step={1}
              min={0}
              max={4}
            />
            <Typography variant="overline" display="block" gutterBottom>Genders</Typography>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="gender" name="gender_dog" value={dogGenders} onChange={(e, val) => changeDogGenders(val)}>
                <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" />
                <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />
                <FormControlLabel value="Both" control={<Radio color="primary" />} label="Both" />
              </RadioGroup>
            </FormControl>
            <Typography variant="overline" display="block" gutterBottom>Information</Typography>
            <FormControlLabel
              control={<Checkbox color="primary" checked={hypoallergenic} onChange={() => changeHypoallergenic(!hypoallergenic)} name="hypoallergenic" />}
              label="Hypoallergenic"
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={neutered} onChange={() => changeNeutered(!neutered)} name="neutered" />}
              label="Neutered/Spayed"
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={healthIssues} onChange={() => changeHealthIssues(!healthIssues)} name="healthIssues" />}
              label="Health issues"
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="overline" display="block" gutterBottom style={{ marginRight: '1rem' }}>Avoid breeds:</Typography>
              <FormControl>
                <Select
                  multiple
                  value={avoidBreeds}
                  onChange={(e) => changeAvoidedBreeds(e.target.value)}
                  input={<Input />}
                  style={{ marginRight: '1rem', minWidth: 150, maxWidth: 400 }}
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
        </div>
      </ThemeProvider>
    </div>
  );
}
