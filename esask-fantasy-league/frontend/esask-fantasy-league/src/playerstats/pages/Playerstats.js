import React, { useState, useEffect } from 'react';
import {HeaderName, PlayerPerformance, MatchesStats, DraftButton} from '../components'
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal'


// var accountID = 'Tu5ydMxHVEFJBeoBrq5hasa6HD6V3SWJzg7cMltFP0c1FPU';
 var summonerID = 'zJz1wEtm2m30q7g3LpKr5r9Fj6ey_leWPIp29EdRsPyKRIs';

function Playerstats(props) {

    const [playerStats, setPlayerStats] = useState([]);
    const [playerEntries, setPlayerEntries] = useState({});
    const [totalGames, setTotalGames] = useState(0);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const sumonnerIDProp = props.summonerID;
    


    const fetchPlayer = async () => {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:3001/api/player/'+ summonerID  //this should be replaced by props.sumonnerID or sumonnerIDProp
        );

        console.log("response stats");
        console.log(response.data.stats);
        console.log("response entries");
        console.log(response.data.entries[0]);
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
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Player's Stats
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <HeaderName performance = {playerEntries} totalGames = {totalGames} />  
                {loading? <Loading /> : ""}       
                <MatchesStats stats = {playerStats} />
                {props.loggedin?<DraftButton onClose={handleClose} loggedin={true}  />:""}

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>
    )
}


export default Playerstats;
