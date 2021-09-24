import React, {useState, useEffect} from 'react';
import Loading from '../../Player List/components/Loading';
import Title from "../../Home Page/components/Title";

function ContestList(props) {
    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchContestsList(){
        setLoading(true);
        const res = await fetch("http://localhost:3002/api/contests");
        res.json().then(res => setContestList(res.data))
        console.log(res)
        setLoading(false);
    }

    useEffect(() => {
        fetchContestsList();
    },[]);

    function handleJoinContestBtnClick(contest) {
        props.history.push({pathname: '/create-team', contest: contest});
    }

    return (
        <div className="contest_list">
            <Title title="List of Contests"/>
            {loading? <Loading /> : ""}
                
            <div data-testid='contest-heading' className="list_heading">
                <div>
                    <div className="contest_name">
                        <p>Contest</p>
                    </div>
                    <div className="start_date">
                        <p>Start Date</p>
                    </div>
                    <div>
                        <p>End Date</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                </div>
            </div>
                
            {contestList.map(contest => (
                <div className="contestList" >
                    <div key={contest._id}>
                        <div className="contest_name">
                            <p>{contest.name}</p>
                        </div>
                        <div className= "start_date">
                            <p>{new Date(contest.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="end_date">
                            <p>{new Date(contest.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className='join_contest'>
                            <button className="btnJoinContest" disabled={!contest.isContestOpen} onClick={() => handleJoinContestBtnClick(contest)}>
                                {contest.isContestOpen ? 'Join Contest' : 'Contest Closed'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContestList