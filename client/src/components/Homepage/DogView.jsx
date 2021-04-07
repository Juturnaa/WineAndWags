import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList';
const DogView = ({ dog, dogPhotos, likePhoto, updateDogIndex }) => {
    return (
        <div className="profile-card" >
            <div id="card-name"> 
                {dog.name} 
            </div>
            <div style={{display: 'flex', direction: 'row'}} >
                <div>
                    <PhotosList likePhoto={likePhoto} photos={dogPhotos} />
                </div>
                <div className="card-text" >
                    <div className="text-component"><div className="text-component-key">Age: </div> <div className="text-component-value"> {dog.age} </div>  </div>
                    <div className="text-component"><div className="text-component-key">Breed: </div> <div className="text-component-value"> {dog.breed} </div></div>
                    <div className="text-component"><div className="text-component-key">About Me: </div> <div className="text-component-value"> {dog.bio} </div></div>
                    <div className="text-component"><div className="text-component-key">Size: </div> <div className="text-component-value"> {dog.size} </div></div>
                    <div className="text-component"><div className="text-component-key">Healthy: </div> <div className="text-component-value"> {dog.healthy ? 'Healthy as can be!' : 'Could Be better..'} </div>  </div>
                    <div className="text-component"><div className="text-component-key">Neutered: </div> <div className="text-component-value"> {dog.neutered ? 'Yes' : 'No'} </div>   </div>
                    <div className="text-component"><div className="text-component-key">Hypoallergenic: </div> <div className="text-component-value"> {dog.hypo ? 'Yes' : 'No'} </div>  </div>                  
                </div>
            </div>
            <button onClick={updateDogIndex} >skip me</button>
        </div>
    )
}

export default DogView;