import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LikeButton = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'rows', marginLeft: "45%"}} >
            <div id="mdiv">
                <div className="mdiv">
                    <div className="md"></div>
                </div>
            </div>
            <div className='heart' ></div>
        </div>
    )
}

export default LikeButton;