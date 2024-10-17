import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './CharacterPage.scss';
import { useParams } from 'react-router-dom';
import Particles from '../elements/Particles';
import CharacterInventory from "../elements/CharacterInventory"
import cowled from "../img/cowled.svg"
import level from "../img/embrassed-energy.svg"
import heart from "../img/heartburn.svg"
import strength from "../img/biceps.svg"
import agility from "../img/body-balance.svg"
import intelligence from "../img/frontal-lobe.svg"
import faith from "../img/prayer.svg"
import music from "../img/musical-notes.svg"
import clover from "../img/clover.svg"
import hp from "../img/glass-heart.svg"
import shield from "../img/edged-shield.svg"
import magicShield from "../img/rosa-shield.svg"
import attack from "../img/saber-slash.svg"
import sprint from "../img/sprint.svg"
import stamina from "../img/heart-beats.svg"
import spellbook from "../img/spell-book.svg"
import fireOrb from "../img/fireOrb.jpeg"

function CharacterPage(){
    const { characterId } = useParams();
    const itemList = [
        {
            id: 1,
            icon: cowled,
            name: 'cowled',
            description: "A beautiful cowled",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'head',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'crown',
            stackable: false,
            armorValue: 3,
            physicalDefense: 10,
            magicalDefense: 5,
            weight: 2,
            quality: 0
        },
        {
            id: 2,
            icon: cowled,
            name: 'ring',
            description: "A beautiful ring A beautiful ring A beautiful ring A beautiful ring A beautiful ring A beautiful ring A beautiful ring",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'ring',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'ring',
            stackable: false,
            armorValue: 3,
            physicalDefense: 10,
            magicalDefense: 5,
            weight: 2,
            quality: 1

        },
        {
            id: 0,
            icon: cowled,
            name: 'potion',
            description: "A beautiful potion",
            equippable: false,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'consumable',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            stackable: true,
            itemClass: 'potion',
            quantity: 100,
            physicalDefense: 10,
            magicalDefense: 5,
            weight: 0,
            quality: 0
        },
        {
            id: 3,
            icon: cowled,
            name: 'ring of ring',
            description: "A ring made of ring",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'ring',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'ring',
            stackable: false,
            armorValue: 3,
            physicalDefense: 10,
            magicalDefense: 5,
            weight: 1,
            quality: 2
        },
        {
            id: 6,
            icon: cowled,
            name: 'ring of 2',
            description: "two rings in one",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'ring',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'ring',
            stackable: false,
            armorValue: 3,
            physicalDefense: 10,
            magicalDefense: 5,
            weight: 1,
            quality: 3
        },
        {
            id: 4,
            icon: cowled,
            name: 'weapon',
            description: "A simple weapon",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'weapon',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'straight sword',
            twoHanded: false,
            stackable: false,
            damage: 22,
            physicalDefense: 10,
            magicalDefense: 5,
            damageType: "cut",
            scaling: {
                vitality: 2,
                strength: 5,
                dexterity: 5,
                intelligence: 1,
                faith: 1,
                charisma: 1,
                luck: 2
            },
            weight: 5,
            quality: 1
        },
        {
            id: 10,
            icon: cowled,
            name: 'weapon',
            description: "A simple weapon",
            equippable: true,        // Whether the item is equippable (true or false)
            equipped: false,         // Whether the item is currently equipped (true or false)
            equipmentType: 'weapon',    // Type of equipment (e.g., 'head', 'chest', 'leg', 'boots', 'weapon', etc.)
            itemClass: 'straight sword',
            twoHanded: false,
            stackable: false,
            damage: 22,
            physicalDefense: 10,
            magicalDefense: 5,
            damageType: "cut",
            scaling: {
                vitality: 2,
                strength: 5,
                dexterity: 5,
                intelligence: 1,
                faith: 1,
                charisma: 1,
                luck: 2
            },
            weight: 5,
            quality: 1
        },
        {
            id: 5,
            icon: strength, // Use a string to represent the icon asset
            name: 'Blade of A Thousand Swords',
            description: "Forged from a thousand swords, this weapon embodies the strength of an entire armory.",
            equippable: true,
            equipped: false,
            equipmentType: 'weapon',
            itemClass: 'two-handed sword', // Consistency in capitalization
            twoHanded: true,
            stackable: false,
            damage: 22,
            physicalDefense: 20,
            magicalDefense: 10,
            damageType: "cut",
            scaling: {
                vitality: 3,
                strength: 6,
                dexterity: 2,
                intelligence: 0,
                faith: 1,
                charisma: 0,
                luck: 1
            },
            weaponEffects: [
                {
                    name: "Weapon Master",
                    effect: "Unleash the weapons within! Your attacks trigger strikes from all weapons in your inventory.",
                    skillType: "passive",
                    resource: "stamina",
                    cost: 5,
                    damage: 100,
                    numberOfTargets: 1

                },
                {
                    name: "Sword Rain",
                    effect: "Summon a torrent of swords from the sky, raining devastation upon your foes.",
                    skillType: "active",
                    resource: "mana",
                    cost: 5,
                    damage: 50,
                    numberOfTargets: 10
                }
            ],
            weight: 20,
            quality: 4
        }
    ]

    const skills = [{
        name: "Blazing Strike",
        description: "Unleash a blazing strike that sets your enemy on fire.",
        skillType: "active",
        resource: "mana",
        cost: 8,
        icon: fireOrb, // Icon identifier or file path
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 4,
            dexterity: 0,
            intelligence: 4,
            faith: 0,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "damage",
            effectNature: "fire",
            strength: 30,
            numberOfCasts: 1,
            numberOfTargets: 1,
            accuracy: 1
        },
        {
            type: "heal",
            effectNature: "fire",
            strength: 3,
            numberOfCasts: 10,
            numberOfTargets: 2,
            accuracy: 0.8
        }],
        level: 1,
    },
    {
        name: "Blazing Conjure",
        description: "Summon the essence of fire to scorch your adversaries.",
        skillType: "active",
        resource: "mana",
        cost: 10,
        icon: fireOrb,
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 2,
            dexterity: 0,
            intelligence: 3,
            faith: 0,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "creature",
            creature:{
                name: "essence of fire",
                icon: fireOrb,
                stats:{
                    maxHp: 100,
                    hp: 100,
                    attack: 20,
                    speed: 20,
                    maxStamina: 20,
                    stamina: 20,
                    maxMana: 10,
                    mana: 10,
                    defense: 30,
                    magicalDefense: 60,
                    equipmentLoad: 1
                },
                skills:[{
                    name: "Blazing Strike",
                    description: "Unleash a blazing strike that sets your enemy on fire.",
                    resource: "mana",
                    cost: 8,
                    icon: fireOrb, // Icon identifier or file path
                    skillEffects: [{
                        type: "damage",
                        effectNature: "fire",
                        strength: 30,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },
                    {
                        type: "damage",
                        effectNature: "fire",
                        strength: 30,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },],
                    level: 1,
                },]
            },
            effectNature: "fire",
            strength: 30,
            numberOfCasts: 1,
            numberOfTargets: 1,
            accuracy: 1
        }],
        level: 2
    },
    {
        name: "Blazing Sword",
        description: "Summon a flamin sword scorch your adversaries.",
        skillType: "active",
        resource: "mana",
        cost: 10,
        icon: fireOrb,
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 2,
            dexterity: 0,
            intelligence: 3,
            faith: 5,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "item",
            item:{
                id: 5,
                icon: strength, // Use a string to represent the icon asset
                name: 'Fire sword',
                description: "Made of pure flames hotter than your average sword.",
                equippable: true,
                equipped: false,
                equipmentType: 'weapon',
                itemClass: 'long sword', // Consistency in capitalization
                twoHanded: false,
                stackable: false,
                damage: 50,
                physicalDefense: 5,
                magicalDefense: 5,
                damageType: "fire",
                scaling: {
                    vitality: 3,
                    strength: 3,
                    dexterity: 3,
                    intelligence: 2,
                    faith: 5,
                    charisma: 1,
                    luck: 1
                },
                weaponEffects: [
                    {
                        name: "Focus fire",
                        effect: "Unleash the high temperature iside the sword as a powerful laser.",
                        skillType: "passive",
                        resource: "stamina",
                        cost: 5,
                        damage: 100,
                        numberOfTargets: 1
                    },
                    {
                        name: "Lava Rain",
                        effect: "Summon a torrent of lava and magma from the sky, raining devastation upon your foes.",
                        skillType: "active",
                        resource: "mana",
                        cost: 5,
                        damage: 20,
                        numberOfTargets: 5
                    }
                ],
                weight: 20,
                quality: 5
            
            },
            effectNature: "fire",
            strength: 30,
            numberOfCasts: 1,
            numberOfTargets: 1,
            accuracy: 1
        }],
        level: 4
    },
    {
        name: "Blazing strength",
        description: "Increase your strenght with the power of fire.",
        skillType: "active",
        resource: "mana",
        cost: 10,
        icon: fireOrb,
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 2,
            dexterity: 0,
            intelligence: 3,
            faith: 5,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "changeStats",
            effectNature: "fire",
            strength: 3,
            numberOfCasts: 1,
            numberOfTargets: 1,
            accuracy: 1,
            self: true,
            statsToChange: ["strenght", "faith"],
            increase: true // if false decrease the stat
        },
        {
            type: "changeStats",
            effectNature: "fire",
            strength: 3,
            numberOfCasts: 1,
            numberOfTargets: 1,
            accuracy: 1,
            self: false,
            statsToChange: ["strenght", "faith"],
            increase: false // if false decrease the stat
        }],
        level: 2
    },
    {
        name: "Set on fire",
        description: "Set your enemy on fire.",
        skillType: "active",
        resource: "mana",
        cost: 10,
        icon: fireOrb,
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 2,
            dexterity: 0,
            intelligence: 3,
            faith: 5,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "status",
            effectNature: "fire",
            strength: 3,
            numberOfTargets: 1,
            accuracy: 1,
            self: false,
            effectName:"fire",
            duration: 4,
            effects:[{
                type: "heal",
                strength: 30,
            },
            {
                type: "damage",
                strength: 30,
            },
            {
                type: "changeStats",
                strength: 3,
                statsToChange: ["strenght", "faith"],
                increase: false // if false decrease the stat
            },]
        },],
        level: 2
    },
    {
        name: "Blazing wall",
        description: "Make a wall of fire in front of your enemies.",
        skillType: "active",
        resource: "mana",
        cost: 8,
        icon: fireOrb, // Icon identifier or file path
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 4,
            dexterity: 0,
            intelligence: 4,
            faith: 0,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "action",
            effectNature: "fire",
            strength: 5,
            actionName: "wall"
        }],
        level: 1,
    },
    {
        name: "Fire spirit transformation",
        description: "Turn into a fire spirit",
        skillType: "active",
        resource: "mana",
        cost: 20,
        icon: fireOrb, // Icon identifier or file path
        triggers: ["click"],
        scaling: {
            vitality: 0,
            strength: 4,
            dexterity: 0,
            intelligence: 4,
            faith: 0,
            charisma: 0,
            luck: 1
        },
        skillEffects: [{
            type: "transformation",
            effectNature: "fire",
            strength: 30,
            creature:{
                name: "Fire spirit",
                icon: fireOrb,
                stats:{
                    maxHp: 200,
                    hp: 200,
                    attack: 50,
                    speed: 50,
                    maxStamina: 50,
                    stamina: 50,
                    maxMana: 50,
                    mana: 50,
                    defense: 50,
                    magicalDefense: 50,
                    equipmentLoad: 20
                },
                skills:[{
                    name: "Blazing bomb",
                    description: "Unleash a blazing bomb that sets your enemy on fire.",
                    resource: "mana",
                    cost: 8,
                    icon: fireOrb, // Icon identifier or file path
                    skillEffects: [{
                        type: "damage",
                        effectNature: "fire",
                        strength: 50,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },
                    {
                        type: "damage",
                        effectNature: "fire",
                        strength: 30,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },],
                    level: 1,
                },
                {
                    name: "Blazing bomb",
                    description: "Unleash a blazing bomb that sets your enemy on fire.",
                    resource: "mana",
                    cost: 8,
                    icon: fireOrb, // Icon identifier or file path
                    skillEffects: [{
                        type: "damage",
                        effectNature: "fire",
                        strength: 50,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },
                    {
                        type: "damage",
                        effectNature: "fire",
                        strength: 30,
                        numberOfCasts: 1,
                        numberOfTargets: 1,
                        accuracy: 1
                    },],
                    level: 1,
                },],
            },
        }],
        level: 3,
    },
]

    const [player, setPlayer] = useState({
        name:"Ertoip",
        description:"The creator of every world known and unkown.",
        icon: intelligence,
        stats:{
            level: 1,
            vitality: 12,
            strength: 13,
            dexterity: 8,
            intelligence: 4,
            faith: 9,
            charisma: 8,
            luck: 10
        },
        equipmentStats:{
            maxHp: 0,
            hp: 0,
            attack: 0,
            speed: 0,
            maxStamina: 0,
            stamina: 0,
            maxMana: 0,
            mana: 0,
            defense: 0,
            magicalDefense: 0,
            equipmentLoad: 0
        }
    })

    return(
        <div className='topContainer'>
            <div className="characterDisplay">
                <div className="characterContainer">

                    <div className='row statsRow'>
                        <div className='col-lg-3'>
                            <img className="characterImage" src={player.icon} alt=""/>
                        </div>
                        <div className='col-lg-3'>
                            <h2>{player.name}</h2>
                            <p className='characterDescription'>{player.description}</p>
                        </div>
                        <div className='col-lg-3'>
                            <ul className="statsList">
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={level} alt=''/>
                                    <p className='characterDescription'>Level</p>
                                    <p className='characterDescription end'>{player.stats.level}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={heart} alt=''/>
                                    <p className='characterDescription'>Vitality</p>
                                    <p className='characterDescription end'>{player.stats.vitality}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={strength} alt=''/>
                                    <p className='characterDescription'>Strength</p>
                                    <p className='characterDescription end'>{player.stats.strength}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={agility} alt=''/>
                                    <p className='characterDescription'>Dexterity</p>
                                    <p className='characterDescription end'>{player.stats.dexterity}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={intelligence} alt=''/>
                                    <p className='characterDescription'>Intelligence</p>
                                    <p className='characterDescription end'>{player.stats.intelligence}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={faith} alt=''/>
                                    <p className='characterDescription'>Faith</p>
                                    <p className='characterDescription end'>{player.stats.faith}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={music} alt=''/>

                                    <p className='characterDescription'>Charisma</p>
                                    <p className='characterDescription end'>{player.stats.charisma}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={clover} alt=''/>
                                    <p className='characterDescription'>Luck</p>
                                    <p className='characterDescription end'>{player.stats.luck}</p>
                                </li>
                                <hr></hr>
                            </ul>
                        </div>
                        <div className='col-lg-3'>
                            <ul className="statsList">
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={hp} alt=''/>
                                    <p className='characterDescription'>HP</p>
                                    <p className='characterDescription end'>{player.equipmentStats.hp}/{player.equipmentStats.maxHp}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={attack} alt=''/>
                                    <p className='characterDescription'>Attack</p>
                                    <p className='characterDescription end'>{player.equipmentStats.attack}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={shield} alt=''/>
                                    <p className='characterDescription'>Physical defense</p>
                                    <p className='characterDescription end'>{player.equipmentStats.defense}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={magicShield} alt=''/>
                                    <p className='characterDescription'>Magic defense</p>
                                    <p className='characterDescription end'>{player.equipmentStats.magicalDefense}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={sprint} alt=''/>
                                    <p className='characterDescription'>Speed</p>
                                    <p className='characterDescription end'>{player.equipmentStats.speed}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={stamina} alt=''/>
                                    <p className='characterDescription'>Stamina</p>
                                    <p className='characterDescription end'>{player.equipmentStats.stamina}/{player.equipmentStats.maxStamina}</p>
                                </li>
                                <hr></hr>
                                <li className="statsVoice">
                                    <img src={spellbook} alt=''/>

                                    <p className='characterDescription'>Mana</p>
                                    <p className='characterDescription end'>{player.equipmentStats.mana}/{player.equipmentStats.maxMana}</p>
                                </li>
                                <hr></hr>
                            </ul>
                        </div>
                    </div>

                    <CharacterInventory itemList={itemList} totalItems={20} player={player} setPlayer={setPlayer} skills={skills} ></CharacterInventory>
                </div>
            </div>
            <Particles/>
        </div>
    )
}

export default CharacterPage;