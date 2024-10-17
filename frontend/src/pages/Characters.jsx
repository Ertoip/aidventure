import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Characters.scss';
import ButtonImage from "../elements/ButtonImage"
import CardButton from "../elements/CardButton"

function Characters(){
    return(
        <div className="charactersDisplay">
            <h2>Your characters</h2>
            <div className="charactersBlock">
                <ButtonImage location={"/character/0"}/>
                <ButtonImage location={"/character/1"}/>
                <ButtonImage location={"/character/0"}/>
                <CardButton location={"/newCharacter"}/>
            </div>

        </div>
    )
}

export default Characters