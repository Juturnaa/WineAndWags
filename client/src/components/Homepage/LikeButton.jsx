import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LikeButton = ({ getRandomUser }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'rows', marginLeft: "45%"}} >
            <button onClick={getRandomUser} >SKIP</button>
            <div className='heart' ></div>
        </div>
    )
}

export default LikeButton;