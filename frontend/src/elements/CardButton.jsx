import React from 'react';
import './CardButton.scss'; // Import your SCSS file
import { useNavigate } from 'react-router-dom'; // version 5.2.0

const CardButton = ({location}) => {
    const navigate = useNavigate()
    const changeLocation = () => {
        navigate(location)
    };

    return (
        <div onClick={changeLocation} className="rounded-card">
            <div className="card-caption">    
                <p>+</p>
            </div>
        </div>
    );
};

export default CardButton;