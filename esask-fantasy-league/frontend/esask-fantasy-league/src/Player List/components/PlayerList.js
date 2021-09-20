import React, {useState, useEffect} from 'react';
import Navbar from '../../NavBar/components/Navbar';
import Loading from './Loading';
import Paginate from './Pagination';

function PlayerList() {
    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const playersPerPage = 35;
    

    async function fetchPlayersList(){
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/playerlist");
        res.json().then(res => setPlayerList(res))
        setLoading(false);
    }

    useEffect(() => {
        fetchPlayersList();
    },[])
   
    
    const startIndex = (page - 1) * playersPerPage;
    const current = playerList.slice(startIndex,startIndex + playersPerPage);
    const totalPages = playerList.length/playersPerPage;
    
    const handlePaginate = number => {
        setPage(number);
    }


    return (
        <div>
            <div>
                <Navbar />
                <div className="title">
                    <h3>List Of Players</h3>
                </div>
                {loading? <Loading /> : ""}
                <div className="listing_heading">
                    <div>
                        <div>
                            <p>Rank</p>
                        </div>
                        <div className="player_name">
                            <p>Player Name</p>
                        </div>
                        <div>
                            <p>League Points</p>
                        </div>
                        <div>
                            <p>Salary</p>
                        </div>
                    </div>
                </div>
                    {current.map(player => (
                        <div className="listing">
                            <div key={player.summonerId}>
                                <div>
                                    <p>{player.pos}</p>
                                </div>
                                <div className="player_name">
                                    <p>{player.summonerName}</p>
                                </div>
                                <div>
                                    <p>{player.leaguePoints}</p>
                                </div>
                                <div>
                                    <p>{player.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            <div className="pagination">
                <p>Page {page} of {totalPages}</p>
                <Paginate totalPages={totalPages} handlePaginate={handlePaginate} />
            </div>        
            
            </div>
            
        </div>
    )
}

export default PlayerList
