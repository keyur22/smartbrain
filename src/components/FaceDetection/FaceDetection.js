import React from 'react';
import './FaceDetection.css';
import BoundaryBox from '../BoundaryBox/BoundaryBox';

const FaceDetection = ({ imageUrl, boxes }) => {
    if (imageUrl) {
        return (
            <div className='ph0 pv4 ph4-ns pv3-l tc faceDetection'>
                <div className='w-100 w-50-m w-40-l relative center'>
                    <img src={imageUrl} alt='Not Available'></img>
                    {
                        boxes.map(box => {
                            return (
                                <BoundaryBox key={box.id} box={box} />
                            );
                        })
                    }
                </div>
            </div>
        )
    } else {
        return null;
    }
};

export default FaceDetection;