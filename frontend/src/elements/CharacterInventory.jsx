import React, { useState, useEffect } from "react";
import "./CharacterInventory.scss"; // Import your component's CSS file
import 'bootstrap/dist/css/bootstrap.css';
import legArmor from "../img/leg-armor.svg"
import breastplate from "../img/breastplate.svg"
import armoredPants from "../img/armored-pants.svg"
import hand from "../img/gauntlet.svg"
import pendant from "../img/gem-pendant.svg"
import ring from "../img/ring.svg"
import hood from "../img/hood.svg"
import human from "../img/character.svg"
import potion from "../img/standing-potion.svg"
import bag from "../img/swap-bag.svg"
import ItemDescriptionBox from "./ItemDescriptionBox";

function CharacterInventory({itemList, totalItems, player, setPlayer, skills}) {
    const itemsPerPage = 14; // Number of items per page

    const [currentPage, setCurrentPage] = useState(1); //inventory page manager
    const [hoveredItem, setHoveredItem] = useState(null); //hovered item description manager
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [equippedItems, setEquippedItems] = useState({ // equipment variable
        head: null,
        headAccessory: null,
        weapon1: null,
        body: null,
        weapon2: null,
        ring1: null,
        legs: null,
        ring2: null,
        boots: null
    });

    //functions to manage inventory functioning
    const DESCRIPTION_BOX_OFFSET_X = 0; // Adjust this value as needed
    const DESCRIPTION_BOX_OFFSET_Y = 70; // Adjust this value as needed

    const handleItemHover = (item) => {
        setHoveredItem(item);
        const descriptionBox = document.getElementById("itemDescriptionBox");

        descriptionBox.style.display = item ? 'block' : 'none';
    };

    const handleMouseMove = (event) => {
        // Update cursor position in the state with offset
        setCursorPosition({
            x: event.clientX - DESCRIPTION_BOX_OFFSET_X,
            y: event.clientY - DESCRIPTION_BOX_OFFSET_Y,
        });
    };

    function addStatsOnEquip(item) {

        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            equipmentStats: {
                ...prevPlayer.equipmentStats,
                attack: item.damage ? Math.round(prevPlayer.equipmentStats.attack + calculateScaling(item, player, item.damage)) : prevPlayer.equipmentStats.attack,
                speed: Math.round(prevPlayer.equipmentStats.speed - (item.weight / (prevPlayer.stats.strength))),
                maxStamina: Math.round(prevPlayer.equipmentStats.maxStamina - (item.weight / (prevPlayer.stats.vitality))),
                stamina: Math.round(prevPlayer.equipmentStats.stamina - (item.weight / (prevPlayer.stats.vitality))),
                defense: Math.round(prevPlayer.equipmentStats.defense + item.physicalDefense),
                magicalDefense: Math.round(prevPlayer.equipmentStats.magicalDefense + item.magicalDefense),
                mana: item.mana ? Math.round(prevPlayer.equipmentStats.mana + item.mana) : prevPlayer.equipmentStats.mana,
                maxMana: item.mana ? Math.round(prevPlayer.equipmentStats.maxMana + item.mana) : prevPlayer.equipmentStats.maxMana,

            },
        }));
    }

    function removeStatsOnUnequip(item) {
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            equipmentStats: {
                ...prevPlayer.equipmentStats,
                attack: item.damage ? Math.round(prevPlayer.equipmentStats.attack - calculateScaling(item, player, item.damage)) : prevPlayer.equipmentStats.attack,
                speed: Math.round(prevPlayer.equipmentStats.speed + (item.weight / (prevPlayer.stats.strength))),
                maxStamina: Math.round(prevPlayer.equipmentStats.maxStamina + (item.weight / (prevPlayer.stats.vitality))),
                stamina: Math.round(prevPlayer.equipmentStats.stamina + (item.weight / (prevPlayer.stats.vitality))),
                defense: Math.round(prevPlayer.equipmentStats.defense - item.physicalDefense),
                magicalDefense: Math.round(prevPlayer.equipmentStats.magicalDefense - item.magicalDefense),
                mana: item.mana ? Math.round(prevPlayer.equipmentStats.mana + item.mana) : prevPlayer.equipmentStats.mana,
                maxMana: item.mana ? Math.round(prevPlayer.equipmentStats.maxMana + item.mana) : prevPlayer.equipmentStats.maxMana,
            },
        }));
    }

    const equipItem = (item) => {
        if (item) {
            const newItem = { ...item, equipped: true };

            const equipmentType = item.equipmentType;
    
            if (item.twoHanded && equipmentType === "weapon") {
                item.equipped = true
                console.log("1")

                addStatsOnEquip(item);

                //For two-handed weapons, occupy both weapon slots
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon1: newItem,
                    weapon2: newItem
                }));
            } else if (equipmentType === "ring" && equippedItems.ring1 && equippedItems.ring2) {
                item.equipped = true

                addStatsOnEquip(item);

                // If both ring slots are occupied, equip in slot 2
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    ring2: newItem,
                }));
            } else if (equipmentType === "weapon" && equippedItems.weapon1 && equippedItems.weapon2 === null) {
                item.equipped = true
                console.log("2")

                addStatsOnEquip(item);

                // If weapon1 is two-handed, equip in weapon2 slot
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon2: newItem,
                }));
            } else if (equipmentType === "ring" && equippedItems.ring1) {
                item.equipped = true

                addStatsOnEquip(item);

                // Equip ring in ring2 slot
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    ring2: newItem,
                }));
            } else if (equipmentType === "ring" && equippedItems.ring1 == null) {
                item.equipped = true

                addStatsOnEquip(item);

                // Equip ring in ring1 slot
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    ring1: newItem,
                }));
            } else if (equipmentType === "weapon" && equippedItems.weapon1 === null) {
                item.equipped = true
                console.log("3")

                addStatsOnEquip(item);

                // Equip weapon in weapon1 slot
                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon1: newItem,
                }));
            } else if (equipmentType !== "weapon" && equipmentType !== "ring"){
                console.log("1")

                item.equipped = true

                addStatsOnEquip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    [equipmentType]: newItem,
                }));
            }
        }
    };
    
    const unequipItem = (item) => {
        if (item) {
            const equipmentType = item.equipmentType;
    
            if (equipmentType === "ring" && equippedItems.ring1?.id === item.id) {
                item.equipped = false

                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    ring1: null,
                }));
            } else if (equipmentType === "ring" && equippedItems.ring2?.id === item.id) {
                item.equipped = false
                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    ring2: null,
                }));
            } else if (equipmentType === "weapon" && equippedItems.weapon1?.id === item.id && item.twoHanded === true) {
                item.equipped = false
                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon1: null,
                    weapon2: null
                }));
            } else if (equipmentType === "weapon" && equippedItems.weapon1?.id === item.id) {
                item.equipped = false
                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon1: null,
                }));
            } else if (equipmentType === "weapon" && equippedItems.weapon2?.id === item.id) {
                item.equipped = false
                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    weapon2: null,
                }));
            } else if (equippedItems[equipmentType]?.id === item.id) {
                item.equipped = false
                removeStatsOnUnequip(item);

                setEquippedItems((prevEquippedItems) => ({
                    ...prevEquippedItems,
                    [equipmentType]: null,
                }));
            }
        }
    };

    const isEquipped = (item) => {
        const equipmentType = item.equipmentType;
    
        if (equipmentType === "ring") {
            return (
                item &&
                (equippedItems.ring1?.id === item.id || equippedItems.ring2?.id === item.id)
            );
        } else if (equipmentType === "weapon") {
            return (
                item &&
                (equippedItems.weapon1?.id === item.id || equippedItems.weapon2?.id === item.id)
            );
        }
    
        return item && equippedItems[equipmentType]?.id === item.id;
    };

    const handleItemClick = (item) => {
        if (item && item.equippable){
            if (isEquipped(item)) {
                unequipItem(item);
            } else {
                equipItem(item);
            }
        }
    };

    function printItemQuality(item) {
        if(item != null){
    
            const numberToCheck = item.quality ?? item.level;
        
            switch (numberToCheck) {
            case 0:
                return "common";
            case 1:
                return "uncommon";
            case 2:
                return "rare";
            case 3:
                return "epic";
            case 4:
                return "legendary";
            default:
                return "mythical";
            }
        }
    }

    // functions to display true stats from scaling

    function scalingCalculator(itemScaling, playerValue){
        console.log("itemScaling:", itemScaling);
        console.log("playerValue:", playerValue);
        return itemScaling * playerValue * 0.25;
    }

    function calculateScaling(item, player, initValue){
        console.log("item:", item);
        console.log("player:", player);
        console.log("initValue:", initValue);
        if(item != null && player != null){

            return Math.round(initValue + scalingCalculator(item.scaling.vitality, player.stats.vitality) + scalingCalculator(item.scaling.strength, player.stats.strength) + scalingCalculator(item.scaling.dexterity, player.stats.dexterity) + scalingCalculator(item.scaling.intelligence, player.stats.intelligence) + scalingCalculator(item.scaling.faith, player.stats.faith) + scalingCalculator(item.scaling.charisma, player.stats.charisma) + scalingCalculator(item.scaling.luck, player.stats.luck))
        }
    }
    
    // Calculate start and end indices for items to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Create a subarray of items to display on the current page
    const itemsToDisplay = itemList.slice(startIndex, endIndex);

    const goToPrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (endIndex < totalItems) {
        setCurrentPage(currentPage + 1);
        }
    };

    function capitalizeFirstLetter(phrase) {
        return phrase.charAt(0).toUpperCase() + phrase.slice(1);
    }

    //empty array ensures everything is run pnly once

    useEffect(() => {
        for (let i = 0; i < itemList.length; i++) {
            let item = itemList[i];
            if (item.equipped) {
                equipItem(item);
            }
        }
    //DO NOT REMOVE COMMENT BELOW VERY IMPORTANT
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const descriptionBox = document.querySelector('.itemDescriptionBox');
        if (descriptionBox) {
            const descriptionBoxRect = descriptionBox.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
    
            // Calculate adjusted position based on viewport dimensions
            const adjustedX = Math.min(
                cursorPosition.x,
                viewportWidth - descriptionBoxRect.width-10
            );
            // Subtract an additional offset from the adjusted Y position to ensure space from the bottom
            const adjustedY = Math.min(
                cursorPosition.y,
                viewportHeight - descriptionBoxRect.height - 100 // Adjust this value as needed
            );
    
            // Set the adjusted position of the itemDescriptionBox
            descriptionBox.style.left = `${adjustedX}px`;
            descriptionBox.style.top = `${adjustedY}px`;
        }
    }, [cursorPosition]);

    return (
        <div className="row inventory"> 
            <ItemDescriptionBox item={hoveredItem} player={player}/>

            <div className="row skills">
                {skills.map((skill, index) => (
                    <div className="skillBlock" 
                    key={index}
                    onMouseMove={handleMouseMove} 
                    onMouseEnter={() => handleItemHover(skill)} 
                    onMouseLeave={() => handleItemHover(null)}>
                        <img src={skill.icon} alt=""/>
                    </div>
                ))}
            </div>
            <div className='col-lg-5'>
                
                <div className="equipment">
                    <div className="headBlock">
                        <div className="equipmentBlock nothing">
                        </div>
                        <div className="equipmentBlock head" onClick={() => handleItemClick(equippedItems.head)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.head)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.head?.icon || hood} alt=""/>
                        </div>
                        <div className="equipmentBlock headAccessory" onClick={() => handleItemClick(equippedItems.headAccessory)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.headAccessory)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.headAccessory?.icon || pendant} alt=""/>
                        </div>
                    </div>                            
                    <div className="armsBlock">
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.weapon1)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.weapon1)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.weapon1?.icon || hand} className='leftHand' alt=""/>
                        </div>
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.body)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.body)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.body?.icon || breastplate} alt=""/>
                        </div>
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.weapon2)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.weapon2)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.weapon2?.icon || hand} alt=""/>
                        </div>
                        
                    </div>
                    <div className="armsBlock">
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.ring1)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.ring1)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.ring1?.icon || ring} alt=""/>
                        </div>
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.legs)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.legs)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.legs?.icon || armoredPants} alt=""/>
                        </div>
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.ring2)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.ring2)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.ring2?.icon || ring} alt=""/>
                        </div>
                    </div>
                    <div className="armsBlock">
                        <div className="equipmentBlock nothing"></div>
                        <div className="equipmentBlock" onClick={() => handleItemClick(equippedItems.boots)} onMouseMove={handleMouseMove} onMouseEnter={() => handleItemHover(equippedItems.boots)} onMouseLeave={() => handleItemHover(null)}>
                            <img src={equippedItems.boots?.icon || legArmor} alt=""/>
                        </div>
                        <div className="equipmentBlock nothing"></div>
                    </div>
                </div>

            </div>
            <div className="inventoryCol col-lg-7">
                <p className="end">{endIndex}/{totalItems}</p>
                <div className="item" onClick={goToPrevPage} disabled={currentPage === 1}>
                    <p className="">&lt; Prev</p>
                </div>
                <div className="item" onClick={goToNextPage} disabled={endIndex >= totalItems}>
                    <p className="end">Next &gt;</p>
                </div>
                {itemsToDisplay.map((item, index) => (
                <div className={"item "+ printItemQuality(item)} key={index}         
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={() => handleItemHover(null)}
                onMouseMove={handleMouseMove}>
                    
                    <div className="icon">
                        {item.icon && <img src={item.icon} alt="" />}
                    </div>
                    
                    <div className="data">
                        <p className=''>{capitalizeFirstLetter(item.name)}</p>
                        <p className="numItems">{item.stackable ? item.quantity : null}</p>
                    </div>

                    <div className="statusIcons">
                            {isEquipped(item) ? <img src={human} alt=""/> : <img src={bag} alt=""/>}
                            {!item.equippable ? <img src={potion} alt=""/> : null}
                    </div>

                </div>
                ))}
                {Array.from({ length: endIndex - startIndex - itemsToDisplay.length }).map((_, index) => (
                    <div className="item" key={index + itemsToDisplay.length}>
                        <div className="icon">
                        </div>
                        <div className="data">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterInventory;
