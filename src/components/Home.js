import React from 'react';
import {FaGithub, FaLinkedin} from 'react-icons/fa';


function Home() {
    return (
        <div className={'bg-dark text-light'} style={{minHeight: '100vh', padding: '10px'}}>
            <h1 className="no-scroll" style={{color: 'goldenrod'}}>
                <div>
                    <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                        <h1 style={{color: 'goldenrod'}}>Hi, Welcome to Books Reviews APP</h1>
                        <h1 style={{color: 'goldenrod'}}>To Read and Write Reviews</h1>
                        <a href={'/login'} style={{textDecoration: "none"}}>
                            <h1 style={{color: 'darkgreen'}}>Login</h1>
                        </a>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <a href="https://github.com/enderta" target='blank' style={{marginRight: "20px"}}>
                                <FaGithub size={40} color="white"/>
                            </a>
                            <a href="https://www.linkedin.com/in/endertanriverdi/" target='blank'>
                                <FaLinkedin size={40} color="white"/>
                            </a>
                        </div>
                    </div>
                </div>
            </h1>
        </div>
    );
}

export default Home;