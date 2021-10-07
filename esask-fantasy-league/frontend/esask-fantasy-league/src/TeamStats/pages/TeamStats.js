/** Author : Nisrine Zbadi 
 * Description: main page to display the stats of a team's stats after clicking on their name
 * this is being called in the contest list page.
*/
import React, { useState, useEffect } from 'react';
import {HeaderName, PlayersPerformance, TeamPerformance} from '../components'
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal'



function TeamStats(props) {
    const [playerStats, setPlayerStats] = useState([]);
    const [teamPerformance, setTeamPerformance] = useState({});
    const [teamScore, setTeamScore] = useState(0);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);
    const [contestOver, setContestOver] = useState(props.contest.status !== "Upcoming");
    const [startDate, setStartDate] = useState(props.contest.startDate);
    const [endDate, setEndDate] = useState(props.contest.endDate);
    const [show, setShow] = useState(true);

    const fetchPlayer = async () => {
        setLoading(true);
        setPlayerStats(props.team.playersData);
        setTeamPerformance(props.team.captainBonus);
        setTeamScore(props.team.score); //this is the total score of the whole team
        setTeamName(props.team.name);
        setLoading(false);
    };

    useEffect(() => {
        fetchPlayer();
    }, []);
      
    return (
      <div>
        <Modal
          data-testid="team-stats-container"
          scrollable={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show = {show}
          onHide={()=>{
            setShow(false);
            props.handleClose();
          }} >

          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Team's Stats
              </Modal.Title>
          </Modal.Header>

          {contestOver?
            loading? <Loading /> :
              <Modal.Body >
                  {/* show the team stats only when the contest is  over */}
              {contestOver?
                  <div><HeaderName teamPerformance = {teamPerformance} teamScore={teamScore} teamName={teamName} />
                  <PlayersPerformance stats = {playerStats} startDate={startDate} endDate={endDate} />
                  <TeamPerformance performance = {teamPerformance}  />
        </div>
              : <h1 className=" header_player text-center text-light" >Team Stats data Unavailable, Please come back when the contest is over</h1>}
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
