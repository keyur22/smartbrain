import React from 'react';
import './ImageInput.css';

const ImageInput = ({ onImageInputChange, onImageSubmit }) => {
    return (
        <div className='ph0 pv1 ph4-ns pv3-l tc image-input'>
            <p className='white f4 f3-l info mb3'>
                This Magic Brain will detect faces in your picture. Give it a try!!!
            </p>
            <div className='flex flex-wrap justify-center relative'>
                <input type='text' placeholder='Enter image URL' className='mb3 mb0-ns pa2 w-100 w-50-ns' onChange={onImageInputChange}></input>
                <a className='link dim ph3 pv2 dib white bg-dark-blue' href='#0' onClick={onImageSubmit}>Detect</a>
            </div>
        </div>
    );
};

export default ImageInput;