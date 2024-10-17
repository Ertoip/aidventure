import React from 'react';
import './MenuButton.scss'; // Create a new CSS file for custom styles
import { useNavigate } from 'react-router-dom'; // version 5.2.0

function MenuButton({ pageName, destination }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(destination)
    };

    return (
        <button className="custom-button" onClick={handleClick}>
            {pageName}
        </button>
    );
}

export default MenuButton;