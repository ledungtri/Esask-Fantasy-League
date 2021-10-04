import React, {useState, useEffect} from 'react';
import TeamRow from '../components/TeamRow';
import TeamsListHeading from '../components/TeamsListHeading'
import Loading from '../../Player List/components/Loading';
import backendHost from '../../api/backendHost';
import ContestDetails from '../../CreateTeam/components/ContestDetails';
import Modal from 'react-bootstrap/Modal';

function ContestInfo({contest, status, show, handleCloseInfo,onJoinBtnClick}) {

    const [currContest, setCurrContest] = useState({});
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const contestID = contest;
    const contestStatus = status;

    async function fetchContest(){
        setLoading(true);
        const res = await fetch(backendHost.BACKEND_HOST + "/api/contests/" + contestID);
        res.json().then(res => {
            setCurrContest(res.data.contest)   
            setTeams(res.data.participatedTeam)
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchContest();
    },[]);

    return (
        <div className="contestInfoContainer">
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleCloseInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Contest Details</Modal.Title>
                </Modal.Header>
                {loading ? <Loading /> : 
                    <Modal.Body>
                        <ContestDetails contest={currContest}/>
                        <TeamsListHeading /> 
                        {teams.map(team => (
                            <TeamRow team={team} contestStatus={contestStatus}/>
                        ))}
                    </Modal.Body>
                }
                {show ? 
                <div className='join-button'>
                    <button
                        className="btnJoinContest"
                        disabled={contestStatus !== 'Upcoming'}
                        onClick={() => onJoinBtnClick(currContest)}
                    >Join Contest</button>
                </div>
                : ""
            }
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}

export default ContestInfo;
