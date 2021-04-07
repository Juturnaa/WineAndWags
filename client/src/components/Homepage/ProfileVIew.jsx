import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList.jsx';

const ProfileView = ({ user, photos }) => (
  <div className="profile-card">
    <div id="card-name">
      {user !== undefined ? user.name : null}
    </div>
    <div>
      <div>
        <PhotosList photos={photos} />
      </div>
      <div className="card-text">
        <div className="text-component">
          {' '}
          <div className="text-component-key">City: </div>
          {' '}
          <div className="text-component-value">
            {' '}
            {user !== undefined ? user.zipcode : null}
            {' '}
          </div>
          {' '}
        </div>
        <div className="text-component">
          {' '}
          <div className="text-component-key">Gender: </div>
          {' '}
          <div className="text-component-value">
            {' '}
            {user.searched_as}
            {' '}
          </div>
          {' '}
        </div>
        <div className="text-component">
          <div className="text-component-key">Age: </div>
          {' '}
          <div className="text-component-value">
            {' '}
            {user !== undefined ? user.age : null}
            {' '}
          </div>
        </div>
        <div className="text-component">
          <div className="text-component-key">About Me: </div>
          {' '}
          <div className="text-component-value">
            {' '}
            {user !== undefined ? user.bio : null}
            {' '}
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default ProfileView;
