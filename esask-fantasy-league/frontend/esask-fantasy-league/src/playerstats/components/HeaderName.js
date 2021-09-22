import React from 'react'
import styled from 'styled-components';
import { PlayerPerformance } from '.';



export default function HeaderName(props) {

    console.log('i am in header name')
    console.log(props.performance)
    return (
        <div className="header_player">
            <h1 className="text-center text-light">{props.performance[0]?props.performance[0].summonerName:""}</h1>
            <PlayerPerformance performance = {props.performance} totalGames={props.totalGames} />
        </div>
    )
}
