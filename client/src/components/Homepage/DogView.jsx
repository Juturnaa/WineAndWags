import React, { useState, useEffect } from 'react';

const DogView = ({ dog }) => {
    console.log(dog)
    return (
        <div className="profile-card" >
            <div>
                <img className="profile-pic" src="https://www.irishtimes.com/polopoly_fs/1.3507373.1527244491!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg" />
            </div>
            <div className="card-text" >
                <div> {dog.name} </div>
                <div> {dog.age} </div>
                <div> {dog.breed} </div>
                <div> {dog.bio} </div>
                <div> {dog.hypo} </div>
                <div> {dog.neutered} </div>
                <div> {dog.size} </div>
                <div> {dog.healthy} </div>
            </div>
        </div>
    )
}

export default DogView;