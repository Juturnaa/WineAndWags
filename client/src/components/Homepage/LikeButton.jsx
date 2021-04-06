import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LikeButton = ({ getRandomUser, filterParams, likeProfile }) => {
    // we still need to pass down the id of the user whos profile we are viewing. NOT the user that is logged in
    return (
        <div style={{display: 'flex', flexDirection: 'rows', marginLeft: "45%"}} >
            <button onClick={() => getRandomUser(filterParams)} >SKIP</button>
            <div className='heart' onClick={() => {
                likeProfile(5);
                getRandomUser(filterParams)
            }}  ></div>
        </div>
    )
}

export default LikeButton;