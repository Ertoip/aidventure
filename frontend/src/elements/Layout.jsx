import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Layout.scss';
import HeaderLink from '../elements/HeaderLink';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // version 5.2.0

function Layout(){
    const navigate = useNavigate()
    const gotohome = () => {
        navigate("/")
    };

    return (
        <div className='layout'>
            <nav className="navbar">
                <div onClick={gotohome} className="logo"><b>AI</b>dventure</div>

                <ul>
                    <li><HeaderLink pageName="Worlds" destination="/worlds"/></li>
                    <li><HeaderLink pageName="Characters" destination="/characters"/></li>
                    <li><HeaderLink pageName="Designer" destination="/designer"/></li>
                    <li><HeaderLink pageName="Vault" destination="/vault"/></li>
                </ul>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout

