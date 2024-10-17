import React, { useState } from "react";
import './NewCharacter.scss';
import Particles from '../elements/Particles';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from '../img/spinner.svg'

function NewCharacter() {
    const [characterName, setCharacterName] = useState('');
    const [className, setClassName] = useState('');
    const [raceName, setRaceName] = useState('');
    const [physicalDescription, setPhysicalDescription] = useState('');
    const [classDescritpion, setClassDescritpion] = useState('');
    const [raceDescritpion, setRaceDescritpion] = useState('');
    const [backstory, setBackstory] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    let oldPhysicalDescription = ""

    const fetchImage = () => {
        // Show loading symbol here (e.g., replace image source with a loading spinner)
        const spin = document.getElementById("spinner");
        spin.classList.remove("d-none");

        fetch("http://127.0.0.1:8000/newCharacterPortrait", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("portraitGen, realistic portrait of " + physicalDescription),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the response as JSON
        })
        .then((response) => {
            response = JSON.parse(response);
            console.log(typeof response);
            spin.classList.add("d-none");

            if (response && response.image) {
                const imageUrl = `data:image/jpeg;base64,${response.image}`;
                
                // Set the image source to the loaded image URL
                setImageSrc(imageUrl);
            } else {
                console.error("Image data not found in the response");
            }
        })
        .catch((error) => {
            spin.classList.add("d-none");
            console.error("Error fetching image:", error);
        });
    };

    const handlePhysicalDescriptionChange = (event) => {
        setPhysicalDescription(event.target.value);
    };

    const handlePhysicalDescriptionBlur = () => {
        if (physicalDescription !== "" && physicalDescription !== oldPhysicalDescription){
            oldPhysicalDescription = physicalDescription;
            fetchImage(); // Call fetchImage when the physicalDescription textarea loses focus
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/addCharacter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                character_name: characterName,
                physicalDescription: physicalDescription,
                classDescritpion: classDescritpion,
                raceDescritpion: raceDescritpion,
                backstory: backstory
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Display response from the server
        }
    };

    return (
        <div className='topContainer'>
            <div className="characterDisplay">
                <div className="characterContainer">
                    <h1>Character creation</h1>
                    <hr className="mb-4"></hr>
                    <div className='row'>
                        <div className='col-lg-3 inputCharacterCol'>
                            <img className="characterGeneratedImage" src={imageSrc} alt=""/>
                            <div className="spinner-container">
                                <img className="spinner d-none" id="spinner" src={Spinner} alt=""/>
                            </div>
                        </div>
                        <div className='col-lg-4 inputCharacterCol'>
                            <h2>Physical description</h2>
                            <div className="inputGroup">
                                <textarea
                                    value={physicalDescription}
                                    onChange={handlePhysicalDescriptionChange}
                                    onBlur={handlePhysicalDescriptionBlur} // Call fetchImage on blur
                                />
                            </div>
                        </div>
                        <div className='col-lg-5 inputCharacterCol'>
                            <input
                                type="text"
                                value={characterName}
                                className="inputName"
                                placeholder="Character name"
                                onChange={(e) => setCharacterName(e.target.value)}
                            />
                            <div className="inputGroup">
                                <textarea
                                    placeholder="Backstory"
                                    value={backstory}
                                    onChange={(e) => setBackstory(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-lg-4">
                        <div className="col-lg-6">

                            <input
                                type="text"
                                value={raceName}
                                className="inputName"
                                placeholder="Race name"
                                onChange={(e) => setRaceName(e.target.value)}
                            />

                            <div className="inputGroup">
                                <textarea
                                    placeholder="Race description"
                                    value={raceDescritpion}
                                    onChange={(e) => setRaceDescritpion(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                value={className}
                                className="inputName"
                                placeholder="Class name"
                                onChange={(e) => setClassName(e.target.value)}
                            />
                            <div className="inputGroup">
                                <textarea
                                    placeholder="Class description"
                                    value={classDescritpion}
                                    onChange={(e) => setClassDescritpion(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            <Particles />
        </div>
    );
}

export default NewCharacter;