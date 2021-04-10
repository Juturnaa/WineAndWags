import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    customHoverFocus: {
      color: '#DDC8C4',
      "&:hover": { color: "#EFF9F0" }
    },
    customHoverFocus2: {
        color: 'red',
        "&:hover": { color: "#EFF9F0" }
      }
  }));

const LikeButton = ({ user, getRandomUser, filterParams, likeProfile }) => {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '10%' }} >
            <div className="like-buttons" ><NotInterestedIcon className={classes.customHoverFocus2} style={{ fontSize: '5em' }} onClick={() =>  getRandomUser(filterParams)}  /></div>
            <div className="like-buttons" style={{marginLeft: '1%'}}><FavoriteIcon className={classes.customHoverFocus} style={{ fontSize: '5em', marginLeft: '2%' }}  onClick={() => {
                likeProfile(user.id);
                getRandomUser(filterParams)
            }} /></div>
        </div>
    )
}

export default LikeButton;