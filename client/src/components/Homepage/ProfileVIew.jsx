import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList.jsx';

const ProfileView = ({ user, photos, likePhoto }) => {
  const [gender, setGender] = useState('');
  useEffect(() => {
    if (user) {
      if (user.searched_as === 'M') {
        setGender('Male');
      } else if (user.searched_as === 'F') {
        setGender('Female');
      } else {
        setGender('Non-Binary');
      }
    }
  }, [user]);

  return (
    <div className="profile-card">
      <div className="photo-container">
        <PhotosList photos={photos || ''} likePhoto={likePhoto} />
        <div className="card-text">
          <div id="card-name">
          {user !== undefined ? user.name : "No name"}
          </div>
          <div className="text-component" style={{flexDirection:'row'}}>
              <div className="text-component-key" style={{minWidth:"fit-content", marginRight:'5'}}>About Me: </div>
              <div className="text-component-value">
                {user !== undefined ? user.bio : null}
              </div>
            </div>
          <div className="card-text-info">
            <div className="text-component">
              <div className="text-component-key">City: </div>
              <div className="text-component-value">
                {user !== undefined ? user.city : null}
              </div>
            </div>
            <div className="text-component">
              <div className="text-component-key">Gender: </div>
              <div className="text-component-value">
                {user !== undefined ? gender : null}
              </div>
            </div>
            <div className="text-component">
              <div className="text-component-key">Age: </div>
              <div className="text-component-value">
                {user !== undefined ? user.age : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
