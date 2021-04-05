import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList.jsx';

const ProfileView = ({ user, photos }) => {
    return (
        <div className="profile-card">
            <div> 
                {user.name} 
            </div>

            <div>
                <PhotosList photos={photos} />
            </div>
            <div className="card-text" >
                <div> {user.zipcode} </div>
                <div> {user.gender} </div>
                <div> {user.age} </div>
                <div> {user.bio} </div>
            </div>
        </div>
    )
}

export default ProfileView;