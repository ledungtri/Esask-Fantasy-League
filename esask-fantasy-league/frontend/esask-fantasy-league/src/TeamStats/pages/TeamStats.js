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
    //const [contestOver, setContestOver] = useState(props.contestOver);
    const [startDate, setStartDate] = useState("2021-09-01");
    const [endDate, setEndDate] = useState("2021-09-07");

    const handleClose = () => setShow(false);
    const teamID = '6157377d1058bad48b54845d'; //this to be deleted when integrating the code with contest page

   // const teamID = props.teamID; //this will come from contest page
    const contestOver = props.contestOver!==null && props.contestOver!==undefined?props.contestOver:true; 
   // const startDate = props.startDate; //this will come from contest page
   // const endDate = props.endDate; //this will come from contest page

    const fetchPlayer = async () => {
        setLoading(true);
        const response = await apiService.getData(teamID, startDate, endDate)
        if(response) {
          if (response.status = 200) {
          console.log("response")
          console.log(response)
          setPlayerStats(response.data.data.playersData);
          setTeamPerformance(response.data.data.captainBonus);
          setTeamScore(response.data.data.score); //this is the total score of the whole team
          setTeamName(response.data.data.name); 

          setLoading(false);
          }
        } else {
          setLoading(false);
           console.error("ERROR RESPONSE");

        }   
      };

    useEffect(() => {
        fetchPlayer();
       
    }, []);
      
    return (
      <div>
        {/* show the team stats only when the contest is  over */}
        <Modal
          data-testid="team-stats-container"
          scrollable={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={()=>setShow(false)} >
            
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Team's Stats
              </Modal.Title>
          </Modal.Header>

          {contestOver?
            loading? <Loading /> :
              <Modal.Body >
                  <HeaderName teamPerformance = {teamPerformance} teamScore={teamScore} teamName={teamName} />  
                  <PlayersPerformance stats = {playerStats} startDate={startDate} endDate={endDate} />
                  <TeamPerformance performance = {teamPerformance}  />

              </Modal.Body>
          
            : <h1 data-testid="teamstats-unavailable" className=" header_player text-center text-light" >
              Team Stats data Unavailable, Please come back when the contest is over</h1>
          }

          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        

      </div>
            
    )
}


export default TeamStats;
