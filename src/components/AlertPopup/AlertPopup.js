import React from 'react';
import './AlertPopup.css';

const AlertPopup = ({ show, msg }) => {
    if (show) {
        return (
            <div className='alert-popup'>
                <div className='bg-white pa4 br2 container'>
                    <p className='pa3 b--dark-red ba br2 bg-light-yellow black'>
                        {msg}
                    </p>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default AlertPopup;