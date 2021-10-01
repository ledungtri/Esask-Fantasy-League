import React, {useState, useEffect} from 'react';
import TeamRow from '../components/TeamRow';
import TeamsListHeading from '../components/TeamsListHeading'
import Loading from '../../Player List/components/Loading';
import backendHost from '../../api/backendHost';
import ContestDetails from '../../CreateTeam/components/ContestDetails';
import Modal from 'react-bootstrap/Modal';

function ContestInfo(props) {

    const [contest, setContest] = useState({});
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [show, setShow] = useState(true);
    const contestID = props.contest;
    const contestStatus = props.status;

    async function fetchContest(){
        setLoading(true);
        console.log(contestID);
        console.log(contestStatus);
        const res = await fetch(backendHost.BACKEND_HOST + "/api/contests/" + contestID);
        res.json().then(res => {
            setContest(res.data.contest)   
            setTeams(res.data.participatedTeam)
        });
        console.log(contest)
        setLoading(false);
    }

    useEffect(() => {
        fetchContest();
    },[]);

    return (
        <div className="contestInfoContainer">
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.handleCloseInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Contest Details</Modal.Title>
                </Modal.Header>
                {loading ? <Loading /> : 
                    <Modal.Body>
                        <ContestDetails contest={contest}/>
                        <TeamsListHeading /> 
                        {teams.map(team => (
                            <TeamRow team={team} contestStatus={contestStatus}/>
                        ))}
                    </Modal.Body>
                }
                {props.show ? 
                <div className='join-button'>
                    <button
                        className="btnJoinContest"
                        disabled={contestStatus !== 'Upcoming'}
                        onClick={() => props.onJoinBtnClick(contest)}
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
