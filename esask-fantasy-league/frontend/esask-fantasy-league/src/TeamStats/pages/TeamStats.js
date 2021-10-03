/** Author : Nisrine Zbadi 
 * Description: main page to display the stats of a player after click
*/
import React, { useState, useEffect } from 'react';
import {HeaderName, PlayerPerformance, PlayersPerformance, DraftButton, TeamPerformance} from '../components'
import axios from 'axios';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal'
import * as apiService from '../api/api'



function TeamStats(props) {

    const [playerStats, setPlayerStats] = useState([]);
    const [teamPerformance, setTeamPerformance] = useState({});
    const [teamScore, setTeamScore] = useState(0);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [startDate, setStartDate] = useState("2021-09-01");
    const [endDate, setEndDate] = useState("2021-09-30");

    const handleClose = () => setShow(false);
   // const teamID = props.teamID; //this will come from contest page
    const teamID = '615499d13389b232e00a21cb'; //this to be deleted when integrating the code with contest page

    const fetchPlayer = async () => {
        setLoading(true);
        const response = await apiService.getData(teamID, startDate, endDate)
     
        if (response.status < 400) {
          console.log("response")
          console.log(response)
          setPlayerStats(response.data.data.playersData);
          setTeamPerformance(response.data.data.captainBonus);
          setTeamScore(response.data.data.score); //this is the total score of the whole team
          setTeamName(response.data.data.name); 

          setLoading(false);
        }
      };


    useEffect(() => {
        fetchPlayer();
       
    }, []);
      
    return (
      <div>
      <Modal
        scrollable={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // show={props.show}
        show={true}
        //  onHide={props.handleClose}
        onHide={()=>setShow(false)}
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Team's Stats
            </Modal.Title>
        </Modal.Header>
            {loading? <Loading /> :
        <Modal.Body >
            <HeaderName teamPerformance = {teamPerformance} teamScore={teamScore} teamName={teamName} />  
            <PlayersPerformance stats = {playerStats} startDate={startDate} endDate={endDate} />
            <TeamPerformance performance = {teamPerformance}  />

        </Modal.Body>
            }

        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      </div>
            
    )
}


export default TeamStats;
