import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';


export default function Landing({ setCurrentID, setLanding, setRegister }) {

    let [login, setLogin] = useState(false);
    let [email, setEmail] =useState('');
    let [password, setPassword] =useState('');

    let handleLogin = () => {
        axios.get(`/app/users/login/${email}`)
            .then((user) => {
                if(!bcrypt.compareSync(password, user.data.password) || user.data.email !== email){
                    alert('Email and/or password are incorrect')
                } else {
                    setCurrentID(user.data.id);
                    setLanding(false);
                }
            })
            .catch(err => {
                console.error(err)
                alert('Email is not registered, try signing up')
            })
    }

    return (
        <div className="login">
            <div className="center">
                <div className="ear ear--left"></div>
                <div className="ear ear--right"></div>
                    <div className="login-body">
                    {login ?
                    <React.Fragment>
                        <div className="face">

                        <div className="eyes">
                            <div className="eye eye--left">
                                <div className="glow"></div>
                            </div>
                            <div className="eye eye--right">
                                <div className="glow"></div>
                            </div>
                        </div>
                        <div className="nose">
                            <svg width="38.161" height="22.03">
                                <path
                                    d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                                    fill="#243946"></path>
                            </svg>
                            <div className="glow"></div>
                        </div>
                        <div className="mouth">
                            <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
                                <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                                    fill="none" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="3"></path>
                            </svg>
                            <div className="mouth-hole"></div>
                            <div className="tongue breath">
                                <div className="tongue-top"></div>
                                <div className="line"></div>
                                <div className="median"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hands">
                        <div className="hand hand--left">
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                        </div>
                        <div className="hand hand--right">
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                            <div className="finger">
                                <div className="bone"></div>
                                <div className="nail"></div>
                            </div>
                        </div>
                    </div>
                    <div className="login-container">
                        <input className="username" type="text" autoComplete="on" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <input className="password" type="password" autoComplete="off" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="login-button" onClick={()=>handleLogin()}>Log in </button>
                        <button className="register-button" onClick={()=>{setRegister(true); setLanding(false)}}>Register </button>
                    </div>

                    </React.Fragment>
                :

                    <div className="content">
                        <h2>Wine and Wags</h2>
                        <h2>Wine and Wags</h2>

                        <span>Find love in someone unknown with the doggy they own</span>
                        <div className="landing-btns">
                            <button className="login-button" onClick={()=> setLogin(true)}>Log in </button>

                            <button className="register-button" onClick={() => {setRegister(true); setLanding(false)}}>Register </button>

                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}