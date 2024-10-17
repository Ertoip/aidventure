import React from 'react';
import './ButtonImage.scss'; // Import your SCSS file
import angel from "../img/angel.jpg"
import { useNavigate } from 'react-router-dom'; // version 5.2.0

const ButtonImage = ({location}) => {
    const navigate = useNavigate()
    const changeLocation = () => {
        navigate(location)
    };

    return (
        <div onClick={changeLocation} className="rounded-button">
            <img className='rounded-image' src={angel} alt=""/> 
            <div className="rounded-caption">    
                <p>Your caption goes here.</p>
            </div>
        </div>
    );
};

export default ButtonImage;