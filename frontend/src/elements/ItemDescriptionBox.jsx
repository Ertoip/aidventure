import React from "react";
import "./ItemDescriptionBox.scss"; // Import your component's CSS file
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

function ItemDescriptionBox({item, player}) {
    
    function scalingCalculator(itemScaling, playerValue){
        
        return itemScaling * playerValue * 0.25;
    }

    //addtotal scaling to initial damage

    function calculateScaling(item, player, initValue, scalingRate = 1){
        if(item != null && player != null){

            return Math.round(initValue + scalingRate * (scalingCalculator(item.scaling.vitality, player.stats.vitality) + scalingCalculator(item.scaling.strength, player.stats.strength) + scalingCalculator(item.scaling.dexterity, player.stats.dexterity) + scalingCalculator(item.scaling.intelligence, player.stats.intelligence) + scalingCalculator(item.scaling.faith, player.stats.faith) + scalingCalculator(item.scaling.charisma, player.stats.charisma) + scalingCalculator(item.scaling.luck, player.stats.luck)))
        }
    }

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

    function capitalizeFirstLetter(phrase) {
        return phrase.charAt(0).toUpperCase() + phrase.slice(1);
    }

    function printSkillLevel(skill) {
        if(skill != null){
    
            const numberToCheck = skill.level;

            switch (numberToCheck) {
                case 0:
                    return "Basic";
                case 1:
                    return "Novice";
                case 2:
                    return "Expert";
                case 3:
                    return "Master";
                case 4:
                    return "Legendary";
                default:
                    return "Godlike";
            }
        }
    }

    function printItemScaling(value) {
        if(value != null){
            switch (value) {
            case 0:
                return "-";
            case 1:
                return "E";
            case 2:
                return "D";
            case 3:
                return "C";
            case 4:
                return "B";
            case 5:
                return "A";
            case 6:
                return "S";
            default:
                return (value>6 ? "S" : "-") 
            }
        }
    }

    return (
        <div className={"itemDescriptionBox " + printItemQuality(item)} id="itemDescriptionBox">
            {item && (
                <div>
                    <div className="top-row">
                        <div className="icon">
                            {item.icon && <img src={item.icon} alt="" />}
                        </div>
                        <div className="text">
                            {item.name && <h2>{capitalizeFirstLetter(item.name)}</h2>}
                            {item.itemClass && <p>{capitalizeFirstLetter(printItemQuality(item)) + " " + item.itemClass}</p>}  
                            {item.level && <p>{printSkillLevel(item)+ " skill " + item.cost + " " +item.resource + " cost"}</p>} 
                            {item.triggers && <p>{"activates on " + item.triggers.join(", ")}</p>}                              
                            {item.damage && item.damageType && <h3>{calculateScaling(item, player, item.damage) + " " + item.damageType + " damage"}</h3>}
                            {item.armorValue && <h3>{item.armorValue + " armor value"}</h3>}
                        </div>
                    </div>
                    {item.scaling &&
                    <div className="scalingRow">
                        <div className="scalingGroup">
                            <img src={heart} alt=''/>
                            <p>{printItemScaling(item.scaling.vitality)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={strength} alt=''/>
                            <p>{printItemScaling(item.scaling.strength)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={agility} alt=''/>
                            <p>{printItemScaling(item.scaling.dexterity)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={intelligence} alt=''/>
                            <p>{printItemScaling(item.scaling.intelligence)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={faith} alt=''/>
                            <p>{printItemScaling(item.scaling.faith)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={music} alt=''/>
                            <p>{printItemScaling(item.scaling.charisma)}</p>
                        </div>
                        <div className="scalingGroup">
                            <img src={clover} alt=''/>
                            <p>{printItemScaling(item.scaling.luck)}</p>
                        </div>
                    </div>}
                    {item.weaponEffects && (
                        <div className="effectsRow">
                            <ul>
                                {item.weaponEffects.map((skill, index) => (
                                    <li key={index}>
                                        <p><strong>{skill.name}</strong>: {skill.effect} dealing {calculateScaling(item, player, skill.damage)} {item.damageType} damage to {skill.numberOfTargets} target{skill.numberOfTargets > 1 ? "s" : ""}</p>
                                        <p className="end">{skill.skillType} skill {skill.cost} {skill.resource} cost</p>
                                        {index !== item.weaponEffects.length - 1 && <hr />}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.skillEffects && (
                        <div className="effectsRow">
                            <ul>
                                <h4>Effect{item.skillEffects.length > 1  && "s"}</h4>
                                <hr />
                                {item.skillEffects.map((skill, index) => (
                                    <li key={index}>
                                        
                                        {skill.type === "damage" && <p>{"Deal " + calculateScaling(item, player, skill.strength) + " " + skill.effectNature + " damage to " + skill.numberOfTargets + " target" + (skill.numberOfTargets > 1 ? "s " : " ") + "for " + skill.numberOfCasts + " time" + (skill.numberOfCasts > 1 ? "s " : " ")}</p>}
                                        
                                        {skill.type === "heal" && <p>{"Heal " + calculateScaling(item, player, skill.strength) + " damage using " + skill.effectNature + " to " + skill.numberOfTargets + " target" + (skill.numberOfTargets > 1 ? "s " : " ") + "for " + skill.numberOfCasts + " time" + (skill.numberOfCasts > 1 ? "s " : " ")}</p>}
                                        
                                        {skill.type === "creature" && 
                                        <div>
                                            <p>{"Summon " + skill.numberOfCasts + " " + skill.creature.name + " with " + Math.round(calculateScaling(item, player, skill.strength)/4) + " bonus stats"}</p>
                                            <div className="effectsRow">
                                                <ul className="creatureStats">
                                                    <li className="statsVoice">
                                                        <img src={skill.creature.icon} alt=''/>
                                                        <h3>{capitalizeFirstLetter(skill.creature.name)}</h3>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={hp} alt=''/>
                                                        <p className='characterDescription'>HP</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.hp + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxHp + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={attack} alt=''/>
                                                        <p className='characterDescription'>Attack</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.attack + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={shield} alt=''/>
                                                        <p className='characterDescription'>Physical defense</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.defense + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                </ul>
                                                <ul className="creatureStats">
                                                    <li className="statsVoice">
                                                        <img src={magicShield} alt=''/>
                                                        <p className='characterDescription'>Magic defense</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.magicalDefense + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={sprint} alt=''/>
                                                        <p className='characterDescription'>Speed</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.speed + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={stamina} alt=''/>
                                                        <p className='characterDescription'>Stamina</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.stamina + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxStamina + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={spellbook} alt=''/>

                                                        <p className='characterDescription'>Mana</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.mana + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxMana + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                </ul>
                                            </div>
                                                
                                            {skill.creature.skills && (
                                            <div className="effectsRow">
                                                {skill.creature.skills.map((creatureSkill, skillIndex) => (
                                                <div key={skillIndex} className="skill">
                                                    <h3 className="creatureSkillName">{creatureSkill.name}</h3>
                                                    <p>{creatureSkill.description + "\n" + printSkillLevel(creatureSkill) + " level" }</p>
                                                    <ul>
                                                    {creatureSkill.skillEffects.map((creatureSkillEffect, index) => (
                                                        <li key={index}>
                                                        {creatureSkillEffect.type === "damage" && 
                                                            <p>
                                                            {"Deal " + (creatureSkillEffect.strength + calculateScaling(item, player, skill.strength)) + " " + skill.effectNature + " damage to " + creatureSkillEffect.numberOfTargets + " target" + (creatureSkillEffect.numberOfTargets > 1 ? "s " : " ") + "for " + creatureSkillEffect.numberOfCasts + " time" + (creatureSkillEffect.numberOfCasts > 1 ? "s " : " ")}
                                                            </p>
                                                        }
                                                        {creatureSkillEffect.type === "heal" && 
                                                            <p>
                                                            {"Heal " + (creatureSkillEffect.strength + calculateScaling(item, player, skill.strength)) + " damage using " + skill.effectNature + " to " + creatureSkillEffect.numberOfTargets + " target" + (creatureSkillEffect.numberOfTargets > 1 ? "s " : " ") + "for " + creatureSkillEffect.numberOfCasts + " time" + (creatureSkillEffect.numberOfCasts > 1 ? "s " : " ")}
                                                            </p>
                                                        }
                                                        {index !== creatureSkill.skillEffects.length - 1 && <hr />}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                </div>
                                                ))}
                                            </div>
                                            )}
                                                
                                        </div>
                                        }
                                        
                                        {skill.type === "item" && 
                                        <div>
                                            <p>{"Summon " + skill.numberOfCasts + " " + printItemQuality(skill.item) + " " + skill.item.name + " a " + skill.effectNature + " " + skill.item.itemClass + " with " + Math.round(calculateScaling(item, player, skill.strength)/4) + " bonus stats"}</p>  
                                            {skill.item && skill.item.damageType && <h3>{ Math.round(calculateScaling(skill.item, player, skill.item.damage) + calculateScaling(item, player, skill.strength)/4) + " " + skill.item.damageType + " damage"}</h3>}
                                        </div>
                                        }   
                                        {skill.item && skill.item.scaling &&
                                        <div className="scalingRow">
                                            <div className="scalingGroup">
                                                <img src={heart} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.vitality)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={strength} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.strength)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={agility} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.dexterity)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={intelligence} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.intelligence)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={faith} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.faith)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={music} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.charisma)}</p>
                                            </div>
                                            <div className="scalingGroup">
                                                <img src={clover} alt=''/>
                                                <p>{printItemScaling(skill.item.scaling.luck)}</p>
                                            </div>
                                        </div>}

                                        {skill.item && skill.item.weaponEffects && (
                                            <div className="effectsRow">
                                                <ul>
                                                    {skill.item.weaponEffects.map((summonedWeaponSkill, index) => (
                                                        <li key={index}>
                                                            <p><strong>{summonedWeaponSkill.name}</strong>: {summonedWeaponSkill.effect} dealing {calculateScaling(skill.item, player, summonedWeaponSkill.damage)} {skill.item.damageType} damage to {summonedWeaponSkill.numberOfTargets} target{summonedWeaponSkill.numberOfTargets > 1 ? "s" : ""}</p>
                                                            <p className="end">{summonedWeaponSkill.skillType} skill {summonedWeaponSkill.cost} {summonedWeaponSkill.resource} cost</p>
                                                            {index !== skill.item.weaponEffects.length - 1 && <hr />}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {skill.item && skill.item.description && (
                                            <div className="descriptionRow">
                                                <p>{item.description}</p>
                                            </div>
                                        )}

                                        {skill.type === "changeStats" && 
                                            <p>{skill.increase === true ? "Increase" : "Decrease"} {skill.self === true ? "your" : "the target's"} {skill.statsToChange.join(", ")} by {calculateScaling(item, player, skill.strength, 1/8)} using {skill.effectNature}</p>
                                        }
                                        
                                        {skill.type === "status" && 
                                        <p>
                                            Set {skill.effectName} on {skill.numberOfTargets} target{skill.numberOfCasts > 1 ? "s" : ""}<br/>
                                            {capitalizeFirstLetter(skill.effectName)}:
                                            {skill.effects.map((effect, index) => (
                                                <span key={index}>
                                                {effect.type === "damage" && 
                                                    <span>
                                                        {" Deal " + calculateScaling(item, player, effect.strength) + " " + skill.effectNature + " damage"} for {calculateScaling(item, player, skill.duration, 1/16)} turn{calculateScaling(item, player, skill.duration, 1/16) > 1 ? "s" : ""}
                                                    </span>
                                                }
                                                {effect.type === "heal" && 
                                                    <span>
                                                        {" Heal " + calculateScaling(item, player, effect.strength) + " damage using " + skill.effectNature} for {calculateScaling(item, player, skill.duration, 1/16)} turn{calculateScaling(item, player, skill.duration, 1/16) > 1 ? "s" : ""}
                                                    </span>
                                                }
                                                {effect.type === "changeStats" && 
                                                    <span>
                                                        {effect.increase === true ? " Increase" : " Decrease"} the target's {effect.statsToChange.join(", ")} by {calculateScaling(item, player, effect.strength, 1/8)} using {skill.effectNature} for {calculateScaling(item, player, skill.duration, 1/16)} turn{calculateScaling(item, player, skill.duration, 1/16) > 1 ? "s" : ""}
                                                    </span>
                                                }
                                                {index < skill.effects.length - 1 && ","}
                                                </span>
                                            ))}
                                        </p>
                                        }

                                        {skill.type === "action" && 
                                            <p>{skill.actionName} of {skill.effectNature} with maximum range of {calculateScaling(item, player, skill.strength, 1/4)}</p>
                                        }

                                        {skill.type === "transformation" && 
                                        <div>
                                            <p>{"Turn into a " + skill.creature.name + " with " + Math.round(calculateScaling(item, player, skill.strength )/4) + " bonus stats"}</p>
                                            <div className="effectsRow">
                                                <ul className="creatureStats">
                                                    <li className="statsVoice">
                                                        <img src={skill.creature.icon} alt=''/>
                                                        <h3>{capitalizeFirstLetter(skill.creature.name)}</h3>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={hp} alt=''/>
                                                        <p className='characterDescription'>HP</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.hp + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxHp + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={attack} alt=''/>
                                                        <p className='characterDescription'>Attack</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.attack + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={shield} alt=''/>
                                                        <p className='characterDescription'>Physical defense</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.defense + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                </ul>
                                                <ul className="creatureStats">
                                                    <li className="statsVoice">
                                                        <img src={magicShield} alt=''/>
                                                        <p className='characterDescription'>Magic defense</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.magicalDefense + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={sprint} alt=''/>
                                                        <p className='characterDescription'>Speed</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.speed + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={stamina} alt=''/>
                                                        <p className='characterDescription'>Stamina</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.stamina + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxStamina + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="statsVoice">
                                                        <img src={spellbook} alt=''/>

                                                        <p className='characterDescription'>Mana</p>
                                                        <p className='characterDescription end'>{skill.creature.stats.mana + Math.round(calculateScaling(item, player, skill.strength)/4)}/{skill.creature.stats.maxMana + Math.round(calculateScaling(item, player, skill.strength)/4)}</p>
                                                    </li>
                                                    <hr></hr>
                                                </ul>
                                            </div>
                                                
                                                {skill.creature.skills && (
                                                <div className="effectsRow">
                                                    {skill.creature.skills.map((creatureSkill, skillIndex) => (
                                                    <div key={skillIndex} className="skill">
                                                        <h3 className="creatureSkillName">{creatureSkill.name}</h3>
                                                        <p>{creatureSkill.description + "\n" + printSkillLevel(creatureSkill) + " level" }</p>
                                                        <ul>
                                                        {creatureSkill.skillEffects.map((creatureSkillEffect, index) => (
                                                            <li key={index}>
                                                            {creatureSkillEffect.type === "damage" && 
                                                                <p>
                                                                {"Deal " + (creatureSkillEffect.strength + calculateScaling(item, player, skill.strength)) + " " + skill.effectNature + " damage to " + creatureSkillEffect.numberOfTargets + " target" + (creatureSkillEffect.numberOfTargets > 1 ? "s " : " ") + "for " + creatureSkillEffect.numberOfCasts + " time" + (creatureSkillEffect.numberOfCasts > 1 ? "s " : " ")}
                                                                </p>
                                                            }
                                                            {creatureSkillEffect.type === "heal" && 
                                                                <p>
                                                                {"Heal " + (creatureSkillEffect.strength + calculateScaling(item, player, skill.strength)) + " damage using " + skill.effectNature + " to " + creatureSkillEffect.numberOfTargets + " target" + (creatureSkillEffect.numberOfTargets > 1 ? "s " : " ") + "for " + creatureSkillEffect.numberOfCasts + " time" + (creatureSkillEffect.numberOfCasts > 1 ? "s " : " ")}
                                                                </p>
                                                            }
                                                            {index !== creatureSkill.skillEffects.length - 1 && <hr />}
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    </div>
                                                    ))}
                                                </div>
                                                )}
                                                
                                        </div>}

                                        {index !== item.skillEffects.length - 1 && <hr />}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.description && (
                        <div className="descriptionRow">
                            <p>{item.description}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ItemDescriptionBox