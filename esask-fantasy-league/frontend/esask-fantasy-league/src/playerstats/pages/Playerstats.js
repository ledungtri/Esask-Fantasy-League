/** Author : Nisrine Zbadi 
 * Description: main page to display the stats of a player after click
*/
import React, { useState, useEffect } from 'react';
import {HeaderName, PlayerPerformance, MatchesStats, DraftButton} from '../components'
import axios from 'axios';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal'
import * as apiService from '../api/api'



function Playerstats(props) {

    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [playerStats, setPlayerStats] = useState([]);
    const [playerEntries, setPlayerEntries] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [loggedin, setLoggedin] = useState(props.loggedin!==null && props.loggedin!==undefined?props.loggedin:false);
    const handleClose = () => setShow(false);
    const sumonnerIDProp = props.summonerId;

    // if(props.loggedin) setLoggedin(props.loggedin)


    const fetchPlayer = async () => {
        setLoading(true);
        const response = await apiService.getData(sumonnerIDProp, startDate, endDate)
        if (response.status < 400) {
          setPlayerStats(response.data.stats);
          setPlayerEntries(response.data.entries);
          setTotalScore((response.data.stats)[0].score);
          setLoading(false);
        }
      };


    useEffect(() => {
        fetchPlayer();
       
    }, []);
      
    return (
      <div>
      <Modal
        size="lg"
        fullscreen="md-down"      
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.handleClose}
      >
      <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Player's Stats
          </Modal.Title>
      </Modal.Header>
      {loading? <Loading /> :
      <Modal.Body>
          <HeaderName performance = {playerEntries}  />  
          <MatchesStats stats = {playerStats} />
      </Modal.Body>
      }
      {loggedin&&props.show?<DraftButton onClose={handleClose} loggedin={true}  />:""}

        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      </div>
            
    )
}


export default Playerstats;
