import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PhotoLikeButton = ({ photoId, likePhoto }) => {
    return (
        <button className="img-btn" onClick={() => likePhoto(photoId)} >LIKE</button>
    )
};

export default PhotoLikeButton;