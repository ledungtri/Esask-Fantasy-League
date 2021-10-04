import React, {useState, useEffect} from 'react';
import Loading from '../../Player List/components/Loading';
import Title from "../../Home Page/components/Title";
import ContestHeading from '../components/ContestHeading';
import ContestRow from '../components/ContestRow';
import backendHost from "../../api/backendHost";
import ContestInfo from '../../ContestInfo/pages/ContestInfo';

function ContestList(props) {

    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showContestInfo, setShowContestInfo] = useState(false);
    const [contestID, setContestID] = useState("");
    const [contestStatus, setContestStatus] = useState("");

    async function fetchContestsList(){
        setLoading(true);
        const res = await fetch(backendHost.BACKEND_HOST + "/api/contests");
        res.json().then(res => setContestList(res.data))
        setLoading(false);
    }

    useEffect(() => {
        fetchContestsList();
    },[]);

    function handleJoinContestBtnClick(contest) {
        props.history.push({pathname: '/create-team', contest: contest});
    }

    function handleShowContestInfo(contestID,contestStatus) {
        setContestID(contestID);
        setContestStatus(contestStatus);
        setShowContestInfo(true);
    }

    function handleCloseContestInfo() {
        setShowContestInfo(false);
    }

    return (
        <div className="contestListContainer">
            {showContestInfo ? <ContestInfo contest={contestID} status={contestStatus} show={showContestInfo} handleCloseInfo={handleCloseContestInfo} onJoinBtnClick={handleJoinContestBtnClick}/> : ""}
            <Title title="List of Contests"/>
            {loading ? <Loading /> : ""}  
            <ContestHeading /> 
            {contestList.map(contest => (
                <ContestRow contest={contest} onJoinBtnClick={handleJoinContestBtnClick} showDetails={handleShowContestInfo}/>
            ))}
        </div>
    )
}

export default ContestList;