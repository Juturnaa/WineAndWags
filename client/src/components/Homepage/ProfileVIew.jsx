import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList.jsx';

const ProfileView = ({ user, photos, likePhoto }) => {
  const [gender, setGender] = useState('');
  useEffect(() => {
    if (user) {
      if (user.searched_as === 'M') {
        setGender('Male')
      } else if (user.searched_as === 'F') {
        setGender('Female')
      } else {
        setGender('Non-Binary')
      }
    }
  }, [user])

  console.log('photos', photos)

  const userPhotos = [
    {
      id: 1,
      url:
            'https://wp.technologyreview.com/wp-content/uploads/2021/03/GettyImages-1229328598-e1616708963898.jpeg',
    },
    {
      id: 2,
      url:
            'data:image/jpeg;base64,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',
    },
    {
      id: 3,
      url:
            'https://static01.nyt.com/images/2020/11/17/business/17techhearing-facebookpreview/17techhearing-facebookpreview-mediumSquareAt3X.jpg',
    },
    {
      id: 4,
      url: 'https://i.insider.com/5b02f5ba1ae6621b008b48a6?width=700',
    },
  ];

  return (
    <div className="profile-card">
      <div className="photo-container">
        <PhotosList photos={photos || ''} likePhoto={likePhoto} />
        <div className="card-text">
          <div id="card-name">
          {user !== undefined ? user.name : "No name"}
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
            <div className="text-component">
              <div className="text-component-key">About Me: </div>
              <div className="text-component-value">
                {user !== undefined ? user.bio : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
