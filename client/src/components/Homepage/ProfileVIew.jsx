import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList.jsx';

const ProfileView = ({ user, photos, likePhoto }) => {
    return (
        <div className="profile-card">
            <div id="card-name"> 
                {user.name} 
            </div>
            <div style={{display: 'flex', direction: 'row'}} >
                <div>
                    <PhotosList likePhoto={likePhoto} photos={photos} />
                </div>
                <div className="card-text" >
                    <div className="text-component"> <div className="text-component-key">City: </div>  <div className="text-component-value" > {user.zipcode} </div>  </div>
                    <div className="text-component"><div className="text-component-key">Gender: </div> <div className="text-component-value"> {user.gender} </div></div>
                    <div className="text-component"><div className="text-component-key">Age: </div> <div className="text-component-value"> {user.age} </div></div>
                    <div className="text-component"><div className="text-component-key">About Me: </div> <div className="text-component-value"> {user.bio} </div></div>
                </div>
            </div>

          
        </div>
    )
}

export default ProfileView;