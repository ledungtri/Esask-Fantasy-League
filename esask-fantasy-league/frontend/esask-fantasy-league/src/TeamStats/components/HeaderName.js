/**
 * -  Author : Nisrine Zbadi
 *  - File purpose : this is the component that shows the name and the score
 *   of a player in the ehader of stats page, 
 *  - Date: October 7th, 2021
 */
import React from 'react'


export default function HeaderName(props) {
    return (
        <div className="header_player">
            <h1 className="text-center text-light">
                {props.teamName?props.teamName+" ":""} 
            </h1>
            <h1 className="text-center text-light">
            Team Score: {props.teamScore?" "+props.teamScore+" Fpts":""}
            </h1>
     
           
        </div>
    )
}
