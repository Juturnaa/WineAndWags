/* eslint-disable camelcase */
/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Breeds from '../dummyData/dogBreed';

export default function Register() {
  const [page, setPage] = useState(3);
  const [user_id, setUserId] = useState();
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [ownerPics, setOwnerPics] = useState(['']);
  const [ownerPicsNum, setOwnerPicsNum] = useState([1]);
  const [ownerAge, setOwnerAge] = useState('');
  const [searched_as, setSearchedAs] = useState('');
  const [ownerBio, setOwnerBio] = useState('');
  const [dogs, setDogs] = useState(['']);
  const [dogPics, setDogPics] = useState([['']]);
  const [dogPicsNum, setDogPicsNum] = useState([[1]]);
  const [dogAges, setDogAges] = useState(['']);
  const [dogGenders, setDogGenders] = useState(['']);
  const [breeds, setBreeds] = useState(['']);
  const [hypos, setHypos] = useState([false]);
  const [neutereds, setNeutereds] = useState([false]);
  const [health_issues, setHealthIssues] = useState([false]);
  const [sizes, setSizes] = useState([0]);
  const [dogBios, setDogBios] = useState(['']);
  const [numDogs, setNumDogs] = useState([1]);
  const [min_size, setMinSize] = useState('XS');
  const [max_size, setMaxSize] = useState('XL');
  const [sizePref, setSizePref] = useState([0, 4]);
  const [dog_min_age, setDogMinAge] = useState(0);
  const [dog_max_age, setDogMaxAge] = useState(20);
  const [dogAgePref, setDogAgePref] = useState([0, 20]);
  const [dog_genders, setDogGendersPref] = useState('');
  const [hypoPref, setHypoPref] = useState(false);
  const [neuteredPref, setNeuteredPref] = useState(false);
  const [healthIssuesPref, setHealthIssuesPref] = useState(false);
  const [avoid_breeds, setAvoidBreeds] = useState([]);
  const [favorite_breeds, setFavoriteBreeds] = useState([]);
  const [max_dist, setMaxDist] = useState(20);
  const [ownerGenders, setOwnerGenders] = useState('');
  const [owner_min_age, setOwnerMinAge] = useState(18);
  const [owner_max_age, setOwnerMaxAge] = useState(50);
  const [ownerAgePref, setOwnerAgePref] = useState([18, 50]);
  let inputs;
  // --------------------------form styling --------------------------//
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
      maxWidth: 400,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const getStyles = (name, personName, theme) => ({
    fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
  });
  const classes = useStyles();
  const theme = useTheme();

  // --------------------------page 1 inputs --------------------------//
  if (page === 1) {
    inputs = (
      <>
        <input name="owner" value={owner} type="text" placeholder="Owner's Name" onChange={(e) => setOwner(e.target.value)} />
        <input name="email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input name="password" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input name="password2" value={password2} type="password" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)} />
        <input name="zipcode" value={zipcode} type="text" placeholder="Zipcode" onChange={(e) => setZipcode(e.target.value)} />
        <input name="city" value={city} type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
      </>
    );
    // --------------------------page 2 inputs --------------------------//
  } else if (page === 2) {
    inputs = (
      <>
        <div className="pictures">
          <div>Pictures</div>
          {ownerPicsNum.map((num) => (
            <div key={num} className="add-photos">
              <input type="file" onChange={(e) => { const arr = ownerPics.slice(); arr.splice(num - 1, 1, e.target.files[0]); setOwnerPics(arr); }} />
              {ownerPicsNum.length <= 4
                ? <FontAwesomeIcon icon={faPlus} onClick={() => { setOwnerPicsNum(ownerPicsNum.concat([ownerPicsNum.length + 1])); setOwnerPics(ownerPics.concat([''])); }} />
                : ''}

              {ownerPicsNum.length > 1
                ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => {
                      setOwnerPicsNum(ownerPicsNum.slice(0, -1));
                      const arr2 = ownerPics.slice(); arr2.splice(num - 1, 1); setOwnerPics(arr2);
                    }}
                  />
                )
                : ''}

            </div>
          ))}

        </div>
        <input placeholder="Age" value={ownerAge} type="number" min={18} onChange={(e) => setOwnerAge(e.target.value)} />
        <div className="gender-input">
          <FormControl component="fieldset">
            <FormLabel component="legend">Include me in searches for</FormLabel>
            <RadioGroup row value={searched_as}>
              <FormControlLabel
                value="M"
                control={<Radio color="primary" />}
                label="M"
                labelPlacement="bottom"
                onClick={() => setSearchedAs('M')}
              />
              <FormControlLabel
                value="F"
                control={<Radio color="primary" />}
                label="F"
                labelPlacement="bottom"
                onClick={() => setSearchedAs('F')}
              />
              <FormControlLabel
                value="Both"
                control={<Radio color="primary" />}
                label="Both"
                labelPlacement="bottom"
                onClick={() => setSearchedAs('Both')}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <textarea className="bio" value={ownerBio} name="ownerBio" placeholder="Bio" onChange={(e) => setOwnerBio(e.target.value)} />
      </>
    );
    // --------------------------page 3 inputs --------------------------//
  } else if (page === 3) {
    inputs = (
      <>
        {numDogs.map((num) => (
          <>
            <input name="dog" value={dogs[num - 1]} type="text" placeholder="Dog's Name" onChange={(e) => { const arr = dogs.slice(); arr.splice(num - 1, 1, e.target.value); setDogs(arr); }} />
            <div className="pictures">
              <span>Pictures</span>
              {dogPicsNum[num - 1].map((num2) => (

                <div key={num2} className="add-photos">
                  <input
                    type="file"
                    onChange={(e) => {
                      const bigArr = dogPics.slice(); const arr = bigArr[num - 1].slice();
                      arr.splice(num2 - 1, 1, e.target.files[0]); bigArr[num - 1] = arr;
                      setDogPics(bigArr);
                    }}
                  />
                  {dogPicsNum[num - 1].length < 4
                    ? (
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => {
                          const bigArrPics = dogPics.slice(); const bigArrNum = dogPicsNum.slice();
                          bigArrPics[num - 1] = bigArrPics[num - 1].concat(['']);
                          bigArrNum[num - 1] = bigArrNum[num - 1].concat([bigArrNum[num - 1].length + 1]);
                          setDogPics(bigArrPics);
                          setDogPicsNum(bigArrNum);
                        }}
                      />
                    )
                    : ''}

                  {dogPicsNum[num - 1].length > 1
                    ? (
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => {
                          const bigArrPics = dogPics.slice(); const arrPics = dogPics[num - 1].slice();
                          const bigArrNum = dogPicsNum.slice(); const arrNum = dogPicsNum[num - 1].slice();
                          arrPics.splice(num2 - 1, 1); bigArrPics[num - 1] = arrPics;
                          bigArrNum[num - 1] = arrNum.slice(0, -1);
                          setDogPics(bigArrPics);
                          setDogPicsNum(bigArrNum);
                        }}
                      />
                    )
                    : ''}

                </div>
              ))}
            </div>
            <input placeholder="Age" name="dogAge" value={dogAges[num - 1]} type="number" min="0" onChange={(e) => { const arr = dogAges.slice(); arr.splice(num - 1, 1, e.target.value); setDogAges(arr); }} />
            <div className="gender-input">
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row value={dogGenders[num - 1]}>
                  <FormControlLabel
                    value="M"
                    control={<Radio color="primary" />}
                    label="M"
                    labelPlacement="bottom"
                    onClick={() => { const arr = dogGenders.slice(); arr.splice(num - 1, 1, 'M'); setDogGenders(arr); }}
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio color="primary" />}
                    label="F"
                    labelPlacement="bottom"
                    onClick={() => { const arr = dogGenders.slice(); arr.splice(num - 1, 1, 'F'); setDogGenders(arr); }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="age-native-required">Breed</InputLabel>
              <Select
                native
                value={breeds[num - 1]}
                onChange={(e) => { const arr = breeds.slice(); arr.splice(num - 1, 1, e.target.value); setBreeds(arr); }}
                name="breed"
                inputProps={{
                  id: 'age-native-required',
                }}
              >
                <option aria-label="None" value="" />
                {Breeds.map((name) => (
                  <option value={name}>{name}</option>
                ))}
              </Select>
            </FormControl>
            <div>
              <span>Hypoallergenic</span>
              <input name="hypo" type="checkbox" checked={hypos[num - 1] === true} onClick={() => { const arr = hypos.slice(); arr.splice(num - 1, 1, !hypos[num - 1]); setHypos(arr); }} />
            </div>
            <div>
              <span>Neutered/Spayed</span>
              <input name="neutered" type="checkbox" checked={neutereds[num - 1] === true} onClick={() => { const arr = neutereds.slice(); arr.splice(num - 1, 1, !neutereds[num - 1]); setNeutereds(arr); }} />
            </div>
            <div>
              <span>Health Issues</span>
              <input name="health_issues" type="checkbox" checked={health_issues[num - 1] === true} onClick={() => { const arr = health_issues.slice(); arr.splice(num - 1, 1, !health_issues[num - 1]); setHealthIssues(arr); }} />
            </div>
            <div style={{ width: 400 }}>
              <Typography id="track-false-slider" gutterBottom>
                Size
              </Typography>
              <Slider
                track={false}
                value={sizes[num - 1]}
                onChange={(e, val) => { const arr = sizes.slice(); arr.splice(num - 1, 1, val); setSizes(arr); }}
                aria-labelledby="track-false-slider"
                marks={[
                  { value: 0, label: 'XS' },
                  { value: 1, label: 'S' },
                  { value: 2, label: 'M' },
                  { value: 3, label: 'L' },
                  { value: 4, label: 'XL' },
                ]}
                min={0}
                max={4}
              />
            </div>
            <textarea className="bio" value={dogBios[num - 1]} name="dogBio" placeholder="Bio" onChange={(e) => { const arr = dogBios.slice(); arr.splice(num - 1, 1, e.target.value); setDogBios(arr); }} />
          </>
        ))}
        {numDogs.length > 1
          ? (
            <button
              className="register-button"
              onClick={() => {
                setNumDogs(numDogs.slice(0, -1));
                setDogs(dogs.slice(0, -1));
                setDogPics(dogPics.slice(0, -1));
                setDogAges(dogAges.slice(0, -1));
                setDogGenders(dogGenders.slice(0, -1));
                setBreeds(breeds.slice(0, -1));
                setHypos(hypos.slice(0, -1));
                setNeutereds(neutereds.slice(0, -1));
                setHealthIssues(health_issues.slice(0, -1));
                setSizes(sizes.slice(0, -1));
                setDogBios(dogBios.slice(0, -1));
                setDogPics(dogPics.slice(0, -1));
                setDogPicsNum(dogPicsNum.slice(0, -1));
              }}
            >
              - Dog
            </button>
          )
          : ''}
        <button
          className="register-button"
          onClick={() => {
            setNumDogs(numDogs.concat([numDogs.length + 1]));
            setDogs(dogs.concat(['']));
            setDogPics(dogPics.concat([[]]));
            setDogAges(dogAges.concat(['']));
            setDogGenders(dogGenders.concat(['']));
            setBreeds(breeds.concat(['']));
            setHypos(hypos.concat([false]));
            setNeutereds(neutereds.concat([false]));
            setHealthIssues(health_issues.concat([false]));
            setSizes(sizes.concat([0]));
            setDogBios(dogBios.concat(['']));
            setDogPics(dogPics.concat([['']]));
            setDogPicsNum(dogPicsNum.concat([[1]]));
          }}
        >
          + Dog
        </button>
      </>
    );
    // --------------------------page 4 inputs --------------------------//
  } else if (page === 4) {
    inputs = (
      <>
        <div>
          Dog
          <div style={{ width: 400 }}>
            <Typography id="range-slider" gutterBottom>
              Size
            </Typography>
            <Slider
              value={sizePref}
              onChange={(e, val) => setSizePref(val)}
              aria-labelledby="range-slider"
              marks={[
                { value: 0, label: 'XS' },
                { value: 1, label: 'S' },
                { value: 2, label: 'M' },
                { value: 3, label: 'L' },
                { value: 4, label: 'XL' },
              ]}
              min={0}
              max={4}
            />
          </div>
          <div style={{ width: 400 }}>
            <Typography id="range-slider" gutterBottom>
              Age
            </Typography>
            <Slider
              value={dogAgePref}
              onChange={(e, val) => setDogAgePref(val)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={20}
            />
          </div>
          <div className="gender-input">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  value="M"
                  control={<Radio color="primary" />}
                  label="M"
                  labelPlacement="bottom"
                  onClick={() => setDogGendersPref('M')}
                />
                <FormControlLabel
                  value="F"
                  control={<Radio color="primary" />}
                  label="F"
                  labelPlacement="bottom"
                  onClick={() => setDogGendersPref('F')}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <span>Hypoallergenic</span>
            <input name="hypo" type="checkbox" checked={hypoPref === true} onChange={() => setHypoPreff(!hypoPref)} />
          </div>
          <div>
            <span>Neutered/Spayed</span>
            <input name="neutered" type="checkbox" checked={neuteredPref === true} onChange={() => setNeuteredPref(!neuteredPref)} />
          </div>
          <div>
            <span>Health Issues</span>
            <input name="health_issues" type="checkbox" checked={healthIssuesPref === true} onChange={() => setHEalthIssuesPref(!healthIssuesPref)} />
          </div>
        </div>
        Owner
        <div>
          <div style={{ width: 400 }}>
            <Typography id="continuous-slider" gutterBottom>
              Distance
            </Typography>
            <Slider
              value={max_dist}
              onChange={(e, val) => setMaxDist(val)}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={20}
            />
          </div>
          <div style={{ width: 400 }}>
            <Typography id="range-slider" gutterBottom>
              Age
            </Typography>
            <Slider
              value={ownerAgePref}
              onChange={(e, val) => setOwnerAgePref(val)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={18}
              max={50}
            />
          </div>
          <div className="gender-input">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  value="M"
                  control={<Radio color="primary" />}
                  label="M"
                  labelPlacement="bottom"
                  onClick={() => setOwnerGenders('M')}
                />
                <FormControlLabel
                  value="F"
                  control={<Radio color="primary" />}
                  label="F"
                  labelPlacement="bottom"
                  onClick={() => setOwnerGenders('F')}
                />
                <FormControlLabel
                  value="All"
                  control={<Radio color="primary" />}
                  label="All"
                  labelPlacement="bottom"
                  onClick={() => setOwnerGenders('All')}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Avoid Breeds</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={avoid_breeds}
                onChange={(e) => setAvoidBreeds(e.target.value)}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {Breeds.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, avoid_breeds, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Preferred Breeds</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={favorite_breeds}
                onChange={(e) => setFavoriteBreeds(e.target.value)}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {Breeds.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, favorite_breeds, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </div>
        </div>
      </>
    );
  }

  const postInfo = () => {
    const promises = [];
    // axios.post to users
    // return the users.id made
    // axios.post to dogs
    // returns the dog.id made
    // axios.post for human file
    // store it into promises
    // axios.post for dog file
    // store it into promises
    // axios.all for the two posting of the photos
    // axios.post('/app/users', {name:owner, dog, email, password, zipcode})
    // axios.post dogs
    // .then(()=> {

    //     dogPics.forEach((dog)=>{
    //         dog.forEach(file=>{
    //         //upload dog photo
    //             const fd = new FormData();
    //             fd.append('image', file, file.name)
    //             fd.append('owner_id', user_id)
    //             promises.push(axios.post(`/app/users/my-dog/${dog_id}`, fd))
    //         })
    //     })
    //     //upload user photo
    // })
    // axios.post(`/app/users/photos/${}`, {})
    // .then()
  };

  // --------------------------Page validation --------------------------//
  const pageHandler = (type) => {
    let validated = true;
    const zipRe = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const emailRe = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (type === 'back') setPage(page - 1);
    else if (page === 1) {
      if ([owner, email, password, password2, zipcode, city].some((x) => x === undefined || x === '')) {
        validated = false;
        alert('Fields cannot be blank');
      } else if (!emailRe.test(email)) {
        validated = false;
        alert('Invalid email');
      } else if (password !== password2) {
        validated = false;
        alert('Passwords must match');
      } else if (!zipRe.test(zipcode)) {
        validated = false;
        alert('Invalid zipcode');
      } else setPage(page + 1);
    } else if (page === 2) {
      if ([ownerAge, searched_as, ownerBio].some((x) => x === undefined || x === '') || ownerPics.some((x) => x === undefined || x === '')) {
        validated = false;
        alert('Fields cannot be blank');
      } else if (ownerAge < 18) {
        validated = false;
        alert('Age must be greater than or equal to 18');
      } else setPage(page + 1);
    } else if (page === 3) {
      for (let i = 0; i < numDogs.length; i++) {
        if ([dogAges[i], dogGenders[i], breeds[i], dogBios[i]].some((x) => x === undefined || x === '') || dogPics[i].some((x) => x === undefined || x === '')) {
          validated = false;
          alert('Fields cannot be blank');
          break;
        }
      }
      if (validated) setPage(page + 1);
    } else if (page === 4) {
      if ([dog_genders, ownerGenders].some((x) => x === undefined || x === '')) {
        validated = false;
        alert('Fields cannot be blank');
      }
      if (validated) postInfo();
    }
  };

  return (
    <div className="register">
      <div className="center">
        <div className="ear ear--left" />
        <div className="ear ear--right" />
        <div className="login-body">
          <div className="face">
            <div className="eyes">
              <div className="eye eye--left">
                <div className="glow" />
              </div>
              <div className="eye eye--right">
                <div className="glow" />
              </div>
            </div>
            <div className="nose">
              <svg width="38.161" height="22.03">
                <path
                  d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                  fill="#243946"
                />
              </svg>
              <div className="glow" />
            </div>
            <div className="mouth">
              <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
                <path
                  d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeMiterlimit="3"
                />
              </svg>
              <div className="mouth-hole" />
              <div className="tongue breath">
                <div className="tongue-top" />
                <div className="line" />
                <div className="median" />
              </div>
            </div>
          </div>
          <div className="hands">
            <div className="hand hand--left">
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
            </div>
            <div className="hand hand--right">
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
              <div className="finger">
                <div className="bone" />
                <div className="nail" />
              </div>
            </div>
          </div>
          <div className="login-container">
            {inputs}
            <div className="register-btns">
              {page > 1 ? <button className="register-button" onClick={() => pageHandler('back')}>Back</button> : ''}
              <button className="register-button" onClick={() => pageHandler('next')}>
                {page === 4 ? 'Register' : 'Next'}
                {' '}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
