import React from 'react';
import './Loader.css';

const Loader = ({ loader }) => {
    if (loader) {
        return (
            <div className="loading">Loading&#8230;</div>
        )
    } else {
        return null;
    }
}

export default Loader;