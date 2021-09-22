import React, {useState, useEffect} from 'react';
import Loading from '../../Player List/components/Loading';
import Paginate from '../../Player List/components/Pagination';
import Title from "../../Home Page/components/Title";
import apis from '../../api/api';

function ContestList(props) {
    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [page, setPage] = useState(1);
    // const contestsPerPage = 10;
    const title = "List of Contests";

    async function fetchContestsList(){
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/contests");
        res.json().then(res => setContestList(res.data))
        console.log(res)
        setLoading(false);
    }

    useEffect(() => {
        fetchContestsList();
    },[]);

    return (
        <div>
            <div>
                {props.disableTitle? "" : <Title title={title}/>}
                {loading? <Loading /> : ""}
                
                    <div className="list_heading">
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
                                    <p>{contest.startDate.substring(0,10)}</p>
                                </div>
                                <div className="end_date">
                                    <p>{contest.endDate.substring(0,10)}</p>
                                </div>
                                <div className='join_contest'>
                                    <button className="btnJoinContest" disabled={!contest.isContestOpen}>{contest.isContestOpen ? 'Join Contest' : 'Contest Closed'}</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    )
}

export default ContestList