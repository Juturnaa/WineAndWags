import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
 
const LikeButton = ({ user, getRandomUser, filterParams, likeProfile }) => {
    // we still need to pass down the id of the user whos profile we are viewing. NOT the user that is logged in
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}} >
            <NotInterestedIcon style={{ fontSize: '100px', color: '#9d0208' }} onClick={() =>  getRandomUser(filterParams)}  />
            <FavoriteIcon style={{ color: "#ddc8c4", fontSize: '100px', marginLeft: '2%' }}  onClick={() => {
                likeProfile(user.id);
                getRandomUser(filterParams)
            }} />
        </div>
    )
}

export default LikeButton;