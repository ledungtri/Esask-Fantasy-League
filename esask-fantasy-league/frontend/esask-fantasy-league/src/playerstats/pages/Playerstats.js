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

    const [playerStats, setPlayerStats] = useState([]);
    const [playerEntries, setPlayerEntries] = useState({});
    const [totalGames, setTotalGames] = useState(0);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const sumonnerIDProp = props.summonerId;


    const fetchPlayer = async () => {
        setLoading(true);
        const response = await apiService.getData(sumonnerIDProp)
     

        if (response.status < 400) {
          setPlayerStats(response.data.stats);
          setPlayerEntries(response.data.entries);
          setTotalGames(response.data.totalGames)
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
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      {props.loggedin&&props.show?<DraftButton onClose={handleClose} loggedin={true}  />:""}

      </div>
            
    )
}


export default Playerstats;
