import React, { useState, useEffect } from 'react';
import {HeaderName, PlayerPerformance, MatchesStats, DraftButton} from '../components'
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    background:rgba(0,0,0,0.5);

`
var accountID = 'Tu5ydMxHVEFJBeoBrq5hasa6HD6V3SWJzg7cMltFP0c1FPU';
var summonerID = 'zJz1wEtm2m30q7g3LpKr5r9Fj6ey_leWPIp29EdRsPyKRIs';

function Playerstats(props) {

    const [playerStats, setPlayerStats] = useState([]);
    const [playerEntries, setPlayerEntries] = useState({});
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);


    const fetchPlayer = async () => {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:3001/api/player/'+accountID+'/'+summonerID
        );

        console.log("response stats");
        console.log(response.data.stats);
        console.log("response entries");
        console.log(response.data.entries[0]);
        if (response.status < 400) {
          setPlayerStats(response.data.stats);
          setPlayerEntries(response.data.entries);
          setLoading(false);
         // return playerStats;
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
                <HeaderName performance = {playerEntries}/>  
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
