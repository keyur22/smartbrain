import React from 'react';

const Navigation = ({ onRouteChange, loggedIn }) => {
    return (
        <div className='cf pa2 ph4-ns pv3-ns'>
            {
                loggedIn === true ?
                    <span
                        className='f4 dim underline pointer white ttu fr'
                        onClick={() => onRouteChange('signIn')}
                    >Sign Out</span> :
                    <span className='fr'>
                        <span
                            className='f4 dim underline pointer white ttu mr3'
                            onClick={() => onRouteChange('register')}
                        >Register</span>
                        <span
                            className='f4 dim underline pointer white ttu'
                            onClick={() => onRouteChange('signIn')}
                        >Sign In</span>
                    </span>
            }
        </div>
    );
};

export default Navigation;