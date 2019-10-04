import React from 'react';
import './Rank.css';

const Rank = ({ user }) => {
    const name = user.name.split(' ')[0];
    return (
        <div className='ph0 pv4 ph4-ns pv3-l f3 f2-ns white tc rank'>
            <p><span className='ttu fw5 lh-copy'>{name}</span>, your current entry count is...</p>
            <p className='f2 f1-ns'>#{user.entries}</p>
        </div>
    );
};

export default Rank;