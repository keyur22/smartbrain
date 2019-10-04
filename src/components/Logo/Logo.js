import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const options = {
    max: 35,     // max tilt rotation (degrees)
    perspective: 200,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1,      // 2 = 200%, 1.5 = 150%, etc..
    speed: 300,    // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,   // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)',    // Easing on enter/exit.
}

const Logo = () => {
    return (
        <Tilt className='Tilt shadow-4 br2 ba b--gray' options={options}>
            <div className='Tilt-inner flex justify-center items-center h-100'>
                <img alt='logo' src={brain}></img>
            </div>
        </Tilt>
    );
};

export default Logo;