import React, {useState, useEffect} from 'react';
import Loading from '../../Player List/components/Loading';
import Title from "../../Home Page/components/Title";
import ContestHeading from './ContestHeading';
import ContestRow from './ContestRow';

function ContestList(props) {

    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchContestsList(){
        setLoading(true);
        const res = await fetch("http://localhost:3002/api/contests");
        res.json().then(res => setContestList(res.data))
        setLoading(false);
    }

    useEffect(() => {
        fetchContestsList();
    },[]);

    function handleJoinContestBtnClick(contest) {
        props.history.push({pathname: '/create-team', contest: contest});
    }

    return (
        <div className="contestListContainer">
            <Title title="List of Contests"/>
            {loading ? <Loading /> : ""}  
            <ContestHeading /> 
            {contestList.map(contest => (
                <ContestRow contest={contest} onJoinBtnClick={handleJoinContestBtnClick}/>
            ))}
        </div>
    )
}

export default ContestList;