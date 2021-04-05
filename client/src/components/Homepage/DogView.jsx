import React, { useState, useEffect } from 'react';

const DogView = ({ dog }) => {
    return (
        <div className="profile-card" >
            <div id="card-name"> 
                {dog.name} 
            </div>
            <div style={{display: 'flex', direction: 'row'}} >
                <div>
                    <img className="profile-pic" src="https://www.irishtimes.com/polopoly_fs/1.3507373.1527244491!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg" />
                </div>
                <div className="card-text" >
                    <div className="text-component"><div className="text-component-key">Age: </div> <div className="text-component-value"> {dog.age} </div>  </div>
                    <div className="text-component"><div className="text-component-key">Breed: </div> <div className="text-component-value"> {dog.breed} </div></div>
                    <div className="text-component"><div className="text-component-key">About Me: </div> <div className="text-component-value"> {dog.bio} </div></div>
                    <div className="text-component"><div className="text-component-key">Size: </div> <div className="text-component-value"> {dog.size} </div></div>
                    <div className="text-component"><div className="text-component-key">Healthy: </div> <div className="text-component-value"> {dog.healthy} </div>  </div>
                    <div className="text-component"><div className="text-component-key">Neutered: </div> <div className="text-component-value"> {dog.neutered} </div>   </div>
                    <div className="text-component"><div className="text-component-key">Hypoallergenic: </div> <div className="text-component-value"> {dog.hypo} </div>  </div>                  
                </div>
            </div>
           
        </div>
    )
}

export default DogView;