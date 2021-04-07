import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

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


export default function Register({ setCurrentID, setRegister }) {
    let [page, setPage] = useState(1);
    let [owner, setOwner] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [password2, setPassword2] = useState('');
    let [zipcode, setZipcode] = useState('');
    let [city, setCity] = useState('');
    let [ownerPics, setOwnerPics] = useState(['']);
    let [ownerPicsNum, setOwnerPicsNum] = useState([1]);
    let [ownerAge, setOwnerAge] = useState('');
    let [searched_as, setSearchedAs] = useState('');
    let [ownerBio, setOwnerBio] =useState('');
    let [dogs, setDogs] = useState(['']);
    let [dogPics, setDogPics] =useState([['']]);
    let [dogPicsNum, setDogPicsNum] =useState([[1]]);
    let [dogAges, setDogAges] =useState(['']);
    let [dogGenders, setDogGenders] =useState(['']);
    let [breeds, setBreeds] =useState(['']);
    let [hypos, setHypos] =useState([false]);
    let [neutereds, setNeutereds] =useState([false]);
    let [health_issues, setHealthIssues] =useState([false]);
    let [sizes, setSizes] =useState([0]);
    let [dogBios, setDogBios] =useState(['']);
    let [numDogs, setNumDogs] =useState([1]);
    let [min_size, setMinSize] =useState(0);
    let [max_size, setMaxSize] =useState(4);
    let [sizePref, setSizePref] =useState([0, 4]);
    let [dog_min_age, setDogMinAge] =useState(0);
    let [dog_max_age, setDogMaxAge] =useState(20);
    let [dogAgePref, setDogAgePref] =useState([0, 20])
    let [dog_genders, setDogGendersPref] =useState('');
    let [hypoPref, setHypoPref] =useState(false);
    let [neuteredPref, setNeuteredPref] =useState(false);
    let [healthIssuesPref, setHealthIssuesPref] =useState(false);
    let [avoid_breeds, setAvoidBreeds] =useState([]);
    let [favorite_breeds, setFavoriteBreeds] =useState([]);
    let [max_dist, setMaxDist] =useState(20);
    let [ownerGenders, setOwnerGenders] =useState('');
    let [owner_min_age, setOwnerMinAge] =useState(18);
    let [owner_max_age, setOwnerMaxAge] =useState(50)
    let [ownerAgePref, setOwnerAgePref] =useState([18, 50])
    let [dogIds, setDogIds] =useState([]);
    let inputs;
    //--------------------------form styling --------------------------//
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
    const getStyles = (name, personName, theme) => {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
    const classes = useStyles();
    const theme = useTheme();

    //--------------------------page 1 inputs --------------------------//
    if(page === 1) {
        inputs = <React.Fragment>
            <input name="owner" value={owner} type="text" placeholder="Owner's Name" onChange={(e) => setOwner(e.target.value)}/>
            <input name="email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input name="password" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input name="password2" value={password2} type="password" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
            <input name="zipcode" value={zipcode} type="text" placeholder="Zipcode" onChange={(e) => setZipcode(e.target.value)}/>
            <input name="city" value={city} type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
            </React.Fragment>
    //--------------------------page 2 inputs --------------------------//
    } else if (page === 2) {
        inputs = <React.Fragment>
            <div className ="pictures">
                <div>Pictures</div>
                {ownerPicsNum.map((num)=> (
                    <div key={num} className="add-photos">
                        <input type="file" id={`img${num-1}`} style={{display:"none"}} onChange={(e) => {let arr =ownerPics.slice(); arr.splice(num-1,1,e.target.files[0]); setOwnerPics(arr)}} />
                        {ownerPics[num-1] === "" ?
                            <button><label htmlFor={`img${num-1}`}>Choose File</label></button>
                        :
                        <div>File Chosen</div>
                        }{ownerPicsNum.length <=4 ?
                            <FontAwesomeIcon icon={faPlus} onClick={() => {setOwnerPicsNum(ownerPicsNum.concat([ownerPicsNum.length+1])); setOwnerPics(ownerPics.concat(['']))}}/>
                        :
                        ""
                        }

                        {ownerPicsNum.length >1 ?
                            <FontAwesomeIcon icon={faMinus} onClick={() => {
                                setOwnerPicsNum(ownerPicsNum.slice(0,-1));
                                let arr2 = ownerPics.slice(); arr2.splice(num-1,1); setOwnerPics(arr2);
                            }}/>
                        :
                        ""
                        }

                    </div>
                ))}


            </div>
            <input placeholder="Age" value={ownerAge} type="number" min={18} onChange={(e) => setOwnerAge(e.target.value)}/>
            <div className="gender-input">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Include me in searches for</FormLabel>
                    <RadioGroup row value={searched_as}>
                        <FormControlLabel
                        value="M"
                        control={<Radio color="primary" />}
                        label="M"
                        labelPlacement="bottom"
                        onClick ={()=> setSearchedAs("M")}
                        />
                        <FormControlLabel
                        value="F"
                        control={<Radio color="primary" />}
                        label="F"
                        labelPlacement="bottom"
                        onClick ={()=> setSearchedAs("F")}
                        />
                        <FormControlLabel
                        value="Both"
                        control={<Radio color="primary" />}
                        label="Both"
                        labelPlacement="bottom"
                        onClick ={()=> setSearchedAs("Both")}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
            <textarea className="bio" value={ownerBio} name="ownerBio" placeholder="Bio" onChange={(e) => setOwnerBio(e.target.value)}/>
            </React.Fragment>
    //--------------------------page 3 inputs --------------------------//
    } else if (page === 3) {
        inputs = <React.Fragment>
            {numDogs.map(num => (
            <React.Fragment>
                <input name="dog" value={dogs[num-1]} type="text" placeholder="Dog's Name" onChange={(e) => {let arr = dogs.slice(); arr.splice(num-1,1,e.target.value); setDogs(arr)}}/>
                <div className ="pictures">
                    <span>Pictures</span>
                    {dogPicsNum[num-1].map((num2)=> (

                    <div key={num2} className="add-photos">
                        <input type="file" id={`img${num-1}${num2-1}`} style={{display:"none"}} onChange={(e) => {
                            let bigArr= dogPics.slice(); let arr = bigArr[num-1].slice();
                            arr.splice(num2-1,1,e.target.files[0]); bigArr[num-1] = arr;
                            setDogPics(bigArr)}} />
                        {dogPics[num-1][num2-1] === "" ?
                            <button><label htmlFor={`img${num-1}${num2-1}`}>Choose File</label></button>
                        :
                        <div>File Chosen</div>
                        }
                        {dogPicsNum[num-1].length <4 ?
                            <FontAwesomeIcon icon={faPlus} onClick={() => {
                                let bigArrPics= dogPics.slice(); let bigArrNum = dogPicsNum.slice();
                                bigArrPics[num-1]= bigArrPics[num-1].concat(['']);
                                bigArrNum[num-1]= bigArrNum[num-1].concat([bigArrNum[num-1].length+1]);
                                setDogPics(bigArrPics);
                                setDogPicsNum(bigArrNum);
                            }}/>
                        :
                        ""
                        }

                        {dogPicsNum[num-1].length >1 ?
                            <FontAwesomeIcon icon={faMinus} onClick={() => {
                                let bigArrPics= dogPics.slice(); let arrPics = dogPics[num-1].slice();
                                let bigArrNum = dogPicsNum.slice(); let arrNum = dogPicsNum[num-1].slice();
                                arrPics.splice(num2-1,1); bigArrPics[num-1] = arrPics;
                                bigArrNum[num-1]= arrNum.slice(0,-1);
                                setDogPics(bigArrPics);
                                setDogPicsNum(bigArrNum);
                            }}/>
                        :
                        ""
                        }

                    </div>
                ))}
                </div>
                <input placeholder="Age" name="dogAge" value={dogAges[num-1]} type="number" min="0" onChange={(e) => {let arr = dogAges.slice(); arr.splice(num-1,1,e.target.value); setDogAges(arr)}}/>
                <div className="gender-input">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row value={dogGenders[num-1]}>
                            <FormControlLabel
                            value="M"
                            control={<Radio color="primary" />}
                            label="M"
                            labelPlacement="bottom"
                            onClick ={()=> {let arr = dogGenders.slice(); arr.splice(num-1,1,"M"); setDogGenders(arr)}}
                            />
                            <FormControlLabel
                            value="F"
                            control={<Radio color="primary" />}
                            label="F"
                            labelPlacement="bottom"
                            onClick ={()=> {let arr = dogGenders.slice(); arr.splice(num-1,1,"F"); setDogGenders(arr)}}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <FormControl required className={classes.formControl}>
                    <InputLabel htmlFor="age-native-required">Breed</InputLabel>
                    <Select
                    native
                    value={breeds[num-1]}
                    onChange ={(e)=> {let arr = breeds.slice(); arr.splice(num-1,1,e.target.value); setBreeds(arr)}}
                    name="breed"
                    inputProps={{
                        id: 'age-native-required',
                    }}
                    >
                    <option aria-label="None" value="" />
                    {Breeds.map(name => (
                    <option value={name}>{name}</option>
                    ))}
                    </Select>
                </FormControl>
                <div><span>Hypoallergenic</span><input name="hypo" type="checkbox" checked={hypos[num-1]===true} onClick={() => {let arr= hypos.slice(); arr.splice(num-1,1, !hypos[num-1]); setHypos(arr)}}/></div>
                <div><span>Neutered/Spayed</span><input name="neutered" type="checkbox" checked={neutereds[num-1]===true} onClick={() => {let arr = neutereds.slice(); arr.splice(num-1,1, !neutereds[num-1]); setNeutereds(arr)}}/></div>
                <div><span>Health Issues</span><input name="health_issues" type="checkbox" checked={health_issues[num-1]===true} onClick={() => {let arr= health_issues.slice(); arr.splice(num-1,1, !health_issues[num-1]); setHealthIssues(arr)}}/></div>
                <div style={{width: 400}}>
                    <Typography id="track-false-slider" gutterBottom>
                        Size
                    </Typography>
                    <Slider
                        track={false}
                        value={sizes[num-1]}
                        onChange={(e, val) => {let arr= sizes.slice(); arr.splice(num-1,1, val); setSizes(arr)}}
                        aria-labelledby="track-false-slider"
                        marks={[
                            {value: 0, label:"XS"},
                            {value: 1, label:"S"},
                            {value: 2, label: "M"},
                            {value: 3, label: "L"},
                            {value: 4, label: "XL"},
                            ]}
                        min={0}
                        max={4}
                    />
                </div>
                <textarea className="bio" value={dogBios[num-1]} name="dogBio" placeholder="Bio" onChange={(e) => { let arr = dogBios.slice(); arr.splice(num-1,1, e.target.value); setDogBios(arr)}}/>
                </React.Fragment>
            ))}
            {numDogs.length > 1 ?
                <button className="register-button" onClick={()=>{
                    setNumDogs(numDogs.slice(0,-1));
                    setDogs(dogs.slice(0,-1));
                    setDogPics(dogPics.slice(0,-1));
                    setDogAges(dogAges.slice(0,-1));
                    setDogGenders(dogGenders.slice(0,-1));
                    setBreeds(breeds.slice(0,-1));
                    setHypos(hypos.slice(0,-1));
                    setNeutereds(neutereds.slice(0,-1));
                    setHealthIssues(health_issues.slice(0,-1));
                    setSizes(sizes.slice(0,-1));
                    setDogBios(dogBios.slice(0,-1));
                    setDogPics(dogPics.slice(0,-1));
                    setDogPicsNum(dogPicsNum.slice(0,-1));
                    }}>- Dog</button>
                :
                ""
            }
            <button className="register-button" onClick={()=>{
                setNumDogs(numDogs.concat([numDogs.length+1]));
                setDogs(dogs.concat(['']))
                setDogPics(dogPics.concat([[]]))
                setDogAges(dogAges.concat(['']))
                setDogGenders(dogGenders.concat(['']))
                setBreeds(breeds.concat(['']))
                setHypos(hypos.concat([false]));
                setNeutereds(neutereds.concat([false]));
                setHealthIssues(health_issues.concat([false]));
                setSizes(sizes.concat([0]));
                setDogBios(dogBios.concat(['']));
                setDogPics(dogPics.concat([['']]));
                setDogPicsNum(dogPicsNum.concat([[1]]));
                }}>+ Dog</button>
            </React.Fragment>
    //--------------------------page 4 inputs --------------------------//
    } else if (page === 4) {
        inputs = <React.Fragment>
            <div>
                Dog
                <div style={{width: 400}}>
                    <Typography id="range-slider" gutterBottom>
                        Size
                    </Typography>
                    <Slider
                        value={sizePref}
                        onChange={(e, val) => {
                            setSizePref(val);
                            setMinSize(val[0]);
                            setMaxSize(val[1]);
                        }}
                        aria-labelledby="range-slider"
                        marks={[
                            {value: 0, label:"XS"},
                            {value: 1, label:"S"},
                            {value: 2, label: "M"},
                            {value: 3, label: "L"},
                            {value: 4, label: "XL"},
                            ]}
                        min={0}
                        max={4}
                    />
                </div>
                <div style={{width: 400}}>
                    <Typography id="range-slider" gutterBottom>
                        Age
                    </Typography>
                    <Slider
                        value={dogAgePref}
                        onChange={(e, val) => {
                            setDogAgePref(val);
                            setDogMinAge(val[0]);
                            setDogMaxAge(val[1]);
                        }}
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
                            onClick ={()=> setDogGendersPref("M")}
                            />
                            <FormControlLabel
                            value="F"
                            control={<Radio color="primary" />}
                            label="F"
                            labelPlacement="bottom"
                            onClick ={()=> setDogGendersPref("F")}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div><span>Hypoallergenic</span><input name="hypo" type="checkbox" checked={hypoPref===true} onChange={() => setHypoPref(!hypoPref)}/></div>
                <div><span>Neutered/Spayed</span><input name="neutered" type="checkbox" checked={neuteredPref===true} onChange={() => setNeuteredPref(!neuteredPref)}/></div>
                <div><span>Health Issues</span><input name="health_issues" type="checkbox" checked={healthIssuesPref===true} onChange={() => setHealthIssuesPref(!healthIssuesPref)}/></div>
            </div>
                Owner
                <div>
                    <div style={{width: 400}}>
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
                    <div style={{width: 400}}>
                        <Typography id="range-slider" gutterBottom>
                            Age
                        </Typography>
                        <Slider
                            value={ownerAgePref}
                            onChange={(e, val) => {
                                setOwnerAgePref(val);
                                setOwnerMinAge(val[0]);
                                setOwnerMaxAge(val[1]);
                            }}
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
                            onClick ={()=> setOwnerGenders("M")}
                            />
                            <FormControlLabel
                            value="F"
                            control={<Radio color="primary" />}
                            label="F"
                            labelPlacement="bottom"
                            onClick ={()=> setOwnerGenders("F")}
                            />
                            <FormControlLabel
                            value="All"
                            control={<Radio color="primary" />}
                            label="All"
                            labelPlacement="bottom"
                            onClick ={()=> setOwnerGenders("All")}
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
                {/* <div>
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

                </div> */}
            </div>
        </React.Fragment>
    }
    //--------------------------Post Info --------------------------//

    let postInfo = () => {
        const hash=bcrypt.hashSync(password, 10);
        let promises =[];

        let promises2 =[];
        axios.post('/app/users', {name:owner, bio:ownerBio, email, hash, age:ownerAge, zipcode, city, searched_as})
            .then((data)=>{
                setCurrentID(data.data.id);
                return data.data.id;
            })
            .then((id)=>{
                ownerPics.forEach((file)=>{
                const fd = new FormData();
                    fd.append('image', file, file.name)
                    axios.post(`/app/users/photos/${id}`, fd)
                })
                return id;
            })
            .then((id)=>{
                dogs.forEach((dog, i)=>{
                    let sizeStr;
                    if(sizes[i]===0) sizeStr="XS";
                    else if(sizes[i]===1) sizeStr="S";
                    else if(sizes[i]===2) sizeStr="M";
                    else if(sizes[i]===3) sizeStr="L";
                    else if(sizes[i]===4) sizeStr="XL";
                    promises.push(axios.post(`/app/dogs/${id}`,{
                        name:dog,
                        gender:dogGenders[i],
                        bio: dogBios[i],
                        hypo: hypos[i],
                        neutered: neutereds[i],
                        age: dogAges[i],
                        size: sizeStr,
                        breed: breeds[i],
                        healthy: health_issues[i]
                    }))
                })
                return id;
            })
            .then((id)=>{
                let minStr;
                let maxStr;
                if(min_size===0) minStr="XS";
                else if(min_size===1) minStr="S";
                else if(min_size===2) minStr="M";
                else if(min_size===3) minStr="L";
                else if(min_size===4) minStr="XL";
                if(max_size===0) maxStr="XS";
                else if(max_size===1) maxStr="S";
                else if(max_size===2) maxStr="M";
                else if(max_size===3) maxStr="L";
                else if(max_size===4) maxStr="XL";
                let avoidStr= avoid_breeds.join();

                axios.post(`/app/${id}/filters`,{
                    min_size: minStr,
                    max_size: maxStr,
                    dog_min_age,
                    dog_max_age,
                    dog_genders,
                    hypo: hypoPref,
                    neutered: neuteredPref,
                    health_issues: healthIssuesPref,
                    avoid_breeds: avoidStr,
                    max_dist,
                    genders: ownerGenders,
                    min_age:owner_min_age,
                    max_age: owner_max_age
                })
                return id;
            })
            .then((id)=>{
                return axios.all(promises)
                .then(axios.spread((...responses) => {
                    responses.forEach((response, i) => {
                        let dog_id = response.data.id;
                        dogPics.forEach((pics)=>{
                            pics.forEach((file)=>{
                                const fd = new FormData();
                                fd.append('image', file, file.name)
                                fd.append('owner_id', id)
                                promises2.push(axios.post(`/app/users/my-dog/${dog_id}`, fd))
                            })
                        })
                    })
                }))

            })
            .then(()=>{
                return axios.all(promises2);
            })
            
            

        // axios.post('/app/users', {name:owner, dog, email, password, zipcode})
        //axios.post dogs
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
    }

    //--------------------------Page validation --------------------------//
    let pageHandler= (type) => {
        let validated = true;
        let zipRe = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        let emailRe = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if(type === 'back') setPage(page-1)
        else if (page === 1) {
            if ([owner, email, password, password2, zipcode, city].some(x => x === undefined || x === '')){
                validated =false;
                alert("Fields cannot be blank")
            } else if (!emailRe.test(email)) {
                validated =false;
                alert("Invalid email")
            } else if (password !== password2) {
                validated = false;
                alert("Passwords must match")
            } else if (!zipRe.test(zipcode)) {
                validated = false
                alert("Invalid zipcode")
            } else setPage(page+1)
        } else if(page === 2) {
            if([ownerAge, searched_as, ownerBio].some(x => x === undefined || x === '') || ownerPics.some(x => x === undefined || x === '')){
                validated =false;
                alert("Fields cannot be blank")
            } else if(ownerAge < 18){
                validated =false;
                alert("Age must be greater than or equal to 18")
            } else setPage(page+1)

        } else if (page === 3) {
            for(let i=0; i<numDogs.length;i++){
                if([dogAges[i],dogGenders[i], breeds[i], dogBios[i]].some(x => x === undefined || x === '') || dogPics[i].some(x => x === undefined || x === '')){
                    validated =false;
                    alert("Fields cannot be blank")
                    break;
                }
            }
            if(validated) setPage(page+1)
        } else if(page === 4) {
            if([dog_genders, ownerGenders].some(x => x === undefined || x === '')){
                validated =false;
                alert("Fields cannot be blank")
            }
            if(validated) postInfo()
        }

    }

    return (
        <div className="register">
            <div className="center">
                <div className="ear ear--left"></div>
                <div className="ear ear--right"></div>
                    <div className="login-body">
                    <div className="face">
                        <div className="eyes">
                            <div className="eye eye--left">
                                <div className="glow"></div>
                            </div>
                            <div className="eye eye--right">
                                <div className="glow"></div>
                            </div>
                        </div>
                        <div className="nose">
                            <svg width="38.161" height="22.03">
                                <path
                                    d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                                    fill="#243946"></path>
                            </svg>
                            <div className="glow"></div>
                        </div>
                        <div className="mouth">
                            <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
                                <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                                    fill="none" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="3"></path>
                            </svg>
                            <div className="mouth-hole"></div>
                            <div className="tongue breath">
                                <div className="tongue-top"></div>
                                <div className="line"></div>
                                <div className="median"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hands">
                        <div className="hand hand--left">
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                        </div>
                        <div className="hand hand--right">
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                        </div>
                    </div>
                    <div className="login-container">
                        {inputs}
                        <div className="register-btns">
                            {page > 1 ? <button className="register-button" onClick={() => pageHandler("back")}>Back</button>:""}
                            <button className="register-button" onClick={() => pageHandler("next")}>{page === 4 ? "Register" : "Next"} </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}