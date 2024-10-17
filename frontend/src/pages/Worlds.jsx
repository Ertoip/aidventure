import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Worlds.scss';
import ButtonImage from "../elements/ButtonImage"

function Worlds(){
    return(
        <div className="campaignsDisplay">
            <h2>Your campaigns</h2>
            <div className="campaignsBlock">
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
            </div>
            <h2>Popular</h2>
            <div className="campaignsBlock">
                <ButtonImage location="page"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
            </div>
            <h2>Discover</h2>
            <div className="campaignsBlock">
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
                <ButtonImage location="pages"/>
            </div>

        </div>
    )
}

export default Worlds