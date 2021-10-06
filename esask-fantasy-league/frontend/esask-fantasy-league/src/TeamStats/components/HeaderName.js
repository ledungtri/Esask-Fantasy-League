import React from 'react'
import styled from 'styled-components';
import { TeamPerformance } from '.';



export default function HeaderName(props) {

    console.log('i am in header name')
    console.log(props)
    console.log(props.teamScore)
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
