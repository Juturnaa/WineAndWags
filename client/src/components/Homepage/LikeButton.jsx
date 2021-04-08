import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


const LikeButton = ({ user, getRandomUser, filterParams, likeProfile }) => {
    // we still need to pass down the id of the user whos profile we are viewing. NOT the user that is logged in
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
            <Button variant="contained" style={{width: '10rem', height: '2.5rem'}} color="primary" onClick={() =>  getRandomUser(filterParams)}>Skip</Button>
            <div className='heart' onClick={() => {
                likeProfile(user.id);
                getRandomUser(filterParams)
            }}  ></div>
        </div>
    )
}

export default LikeButton;