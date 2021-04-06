import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LikeButton = ({ getRandomUser, filterParams }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'rows', marginLeft: "45%"}} >
            <button onClick={() => getRandomUser(filterParams)} >SKIP</button>
            <div className='heart' ></div>
        </div>
    )
}

export default LikeButton;