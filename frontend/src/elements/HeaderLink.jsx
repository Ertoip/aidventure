import React from 'react';
import './HeaderLink.scss'; // Create a new CSS file for custom styles
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

function HeaderLink({ pageName, destination }) {
    const location = useLocation();

    const isActivePage = (destination) => {
        if(location.pathname === destination){
            return "custom-link-active"
        }
        return "custom-link"
    };

    return (
        <Link className={isActivePage(destination)} to={destination}>
            {pageName}
        </Link>
    );
}

export default HeaderLink;