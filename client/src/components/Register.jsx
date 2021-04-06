import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default function Register() {
    let [page, setPage] = useState(3);
    let [user_id, setUserId] = useState();
    let [owner, setOwner] = useState();
    let [dog, setDog] = useState();
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [password2, setPassword2] = useState();
    let [zipcode, setZipcode] = useState();
    let [ownerPics, setOwnerPics] = useState();
    let [ownerAge, setOwnerAge] = useState();
    let [searched_as, setSearchedAs] = useState();
    let [ownerBio, setOwnerBio] =useState();
    let [dogPics, setDogPics] =useState();
    let [dogAge, setDogAge] =useState();
    let [dogGender, setDogGender] =useState();
    let [breed, setBreed] =useState();
    let [hypo, setHypo] =useState();
    let [neutered, setNeutered] =useState();
    let [health_issues, setHealthIssues] =useState();
    let [size, setSize] =useState();
    let [dogBio, setDogBio] =useState();
    let [min_size, setMinSize] =useState();
    let [max_size, setMaxSize] =useState();
    let [sizePref, setSizePref] =useState([0, 4]);
    let [dog_min_age, setDogMinAge] =useState();
    let [dog_max_age, setDogMaxAge] =useState();
    let [dogAgePref, setDogAgePref] =useState([0, 20])
    let [dog_genders, setDogGenders] =useState();
    let [hypoPref, setHypoPref] =useState();
    let [neuteredPref, setNeuteredPref] =useState();
    let [healthIssuesPref, setHealthIssuesPref] =useState();
    let [avoid_breeds, setAvoidBreeds] =useState();
    let [favorite_breeds, setFavoriteBreeds] =useState();
    let [max_dist, setMaxDist] =useState(20);
    let [ownerGenders, setOwnerGenders] =useState();
    let [owner_min_age, setOwnerMinAge] =useState();
    let [owner_max_age, setOwnerMaxAge] =useState()
    let [ownerAgePref, setOwnerAgePref] =useState([18, 50])

    let inputs;
    if(page === 1) {
        inputs = <React.Fragment>
            <input name="owner" type="text" placeholder="Owner's Name" />
            <input name="dog" type="text" placeholder="Dog's Name" />
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <input name="password2" type="password" placeholder="Confirm Password" />
            <input name="zipcode" type="text" placeholder="Zipcode" />
            </React.Fragment>
    } else if (page === 2) {
        inputs = <React.Fragment>
            <div className ="pictures">
                <span>Pictures</span><span>+</span>
            </div>
            <input name="ownerAge" type="number" min="18" placeholder="Age" />
            <div>
                Include me in searches for: 
                <label>
                    <input 
                        name="searched_as" 
                        type="radio" 
                        value="M" 
                        checked= {searched_as === "M"} 
                        onClick ={()=> setSearchedAs("M")}
                    />
                    M
                </label>
                <label>
                    <input 
                        name="searched_as" 
                        type="radio" 
                        value="F" 
                        checked= {searched_as === "F"} 
                        onClick ={()=> setSearchedAs("F")}
                    />
                    F
                </label>
                <label>
                    <input 
                        name="searched_as" 
                        type="radio" 
                        value="Both" 
                        checked= {searched_as === "Both"} 
                        onClick ={()=> setSearchedAs("Both")}
                    />
                    Both
                </label>
            </div>
            <textarea name="ownerBio" placeholder="Bio" />
            </React.Fragment>
    } else if (page === 3) {
        inputs = <React.Fragment>
            <div className ="pictures">
                <span>Pictures</span><span>+</span>
            </div>
            <input name="dogAge" type="number" min="0" placeholder="Age" />
            <div>
                Gender 
                <label>
                    <input 
                        name="dogGender" 
                        type="radio" 
                        value="M" 
                        checked= {dogGender === "M"} 
                        onClick ={()=> setDogGender("M")}
                    />
                    M
                </label>
                <label>
                    <input 
                        name="dogGender" 
                        type="radio" 
                        value="F" 
                        checked= {dogGender === "F"} 
                        onClick ={()=> setDogGender("F")}
                    />
                    F
                </label>
            </div>
            <input name="breed" type="text" placeholder="Breed" />
            <div><span>Hypoallergenic</span><input name="hypo" type="checkbox" /></div>
            <div><span>Neutered/Spayed</span><input name="neutered" type="checkbox" /></div>
            <div><span>Health Issues</span><input name="health_issues" type="checkbox" /></div>
            <div style={{width: 400}}>
                <Typography id="track-false-slider" gutterBottom>
                    Size
                </Typography>
                <Slider
                    value={size}
                    onChange={(e, val) => setSize(val)}
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
            <textarea name="dogBio" placeholder="Bio" />
            <button className="register-button">+ Dog</button>
            </React.Fragment>
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
                        onChange={(e, val) => setSizePref(val)}
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
                        onChange={(e, val) => setDogAgePref(val)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={20}
                    />
                </div>
                <div>
                    Gender 
                    <label>
                        <input 
                            name="dog_genders" 
                            type="radio" 
                            value="M" 
                            checked= {dogGender === "M"} 
                            onClick ={()=> setDogGenders("M")}
                        />
                        M
                    </label>
                    <label>
                        <input 
                            name="dog_genders" 
                            type="radio" 
                            value="F" 
                            checked= {dogGender === "F"} 
                            onClick ={()=> setDogGenders("F")}
                        />
                        F
                    </label>
                    <label>
                        <input 
                            name="dog_genders" 
                            type="radio" 
                            value="F" 
                            checked= {dogGender === "Both"} 
                            onClick ={()=> setDogGenders("Both")}
                        />
                        Both
                    </label>
                </div>
                <div><span>Hypoallergenic</span><input name="hypo" type="checkbox" /></div>
                <div><span>Neutered/Spayed</span><input name="neutered" type="checkbox" /></div>
                <div><span>Health Issues</span><input name="health_issues" type="checkbox" /></div>
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
                            onChange={(e, val) => setOwnerAgePref(val)}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={18}
                            max={50}
                        />
                    </div>
                <div>
                    Gender 
                    <label>
                        <input 
                            name="ownerGenders" 
                            type="radio" 
                            value="M" 
                            checked= {ownerGenders === "M"} 
                            onClick ={()=> setOwnerGenders("M")}
                        />
                        M
                    </label>
                    <label>
                        <input 
                            name="ownerGenders" 
                            type="radio" 
                            value="F" 
                            checked= {ownerGenders === "F"} 
                            onClick ={()=> setOwnerGenders("F")}
                        />
                        F
                    </label>
                    <label>
                        <input 
                            name="ownerGenders" 
                            type="radio" 
                            value="All" 
                            checked= {ownerGenders=== "All"} 
                            onClick ={()=> setOwnerGenders("All")}
                        />
                        All
                    </label>
                </div>
            </div>
        </React.Fragment>
    }

    let pageHandler= (type) => {
        if(type === 'back') setPage(page-1)
        else if(page < 4) setPage(page+1)
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
                        {page > 1 ? <button className="register-button" onClick={() => pageHandler("back")}>Back</button>:""}                        
                        <button className="register-button" onClick={() => pageHandler("next")}>{page === 4 ? "Register" : "Next"} </button>
                    </div>
                </div>
            </div>
        </div>
    )
}