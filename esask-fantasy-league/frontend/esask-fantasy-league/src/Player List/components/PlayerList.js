import React, {useState, useEffect} from 'react';
import Navbar from '../../NavBar/components/Navbar';
import Loading from './Loading';
import Paginate from './Pagination';
import Playerstats from "../../playerstats/pages/Playerstats";

function PlayerList(props) {
    const [playerList, setPlayerList] = useState([]);
    const [showBtn, setShowBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [summoner, setSummoner] = useState();
    const [page, setPage] = useState(1);
    const playersPerPage = props.playersPerPage || 35;
    const title = props.title || "List Of Players";
    

    async function fetchPlayersList(){
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/playerlist");
        res.json().then(res => setPlayerList(res))
        setLoading(false);
        setShowBtn(props.showBtn);
    }

    useEffect(() => {
        if(!props.players){
            fetchPlayersList();
        }else{
            setPlayerList(props.players)
        }
        
    },[])
   
    
    const startIndex = (page - 1) * playersPerPage;
    const current = playerList.slice(startIndex,startIndex + playersPerPage);
    const totalPages = Math.ceil(playerList.length/playersPerPage);
    
    const handlePaginate = (number) => {
        setPage(number);
    }
    const showPlayerDetails = (player) =>{
        setShowPlayerStats(true);
        console.log(player);
        setSummoner(player);
    }
    const handleClose = () =>{
        setShowPlayerStats(false);
    }

    return (
        <div className="player_list">
            {showPlayerStats ? <Playerstats summonerId={summoner} show={showPlayerStats} handleClose={handleClose}
                                            loggedin={true}/> : ""
            }
            <div>
                <div className="title">
                    <h3 data-testid="title">{title}</h3>
                </div>
                {loading? <Loading /> : ""}
                {showBtn ? "" :
                    <div className={showBtn ? "listing_heading width_75" :"listing_heading width_50"}>
                        <div>
                            <div className="player_rank">
                                <p>Rank</p>
                            </div>
                            <div className="player_name">
                                <p className="width">Player Name</p>
                            </div>
                            <div>
                                <p className="width">League Points</p>
                            </div>
                            <div>
                                <p>Salary</p>
                            </div>
                        </div>
                    </div>
                }
                    {current.map(player => (
                        <div className={showBtn ? "listing width_75" : "listing hover width_50"} >
                            <div key={player.summonerId}>
                                    <div>
                                        <p>{player.pos}</p>
                                    </div>
                                    <div className= "player_name">
                                        <a href="#" onClick={()=>showPlayerDetails(player.summonerId)}>
                                            <p className="width">{player.summonerName}</p>
                                        </a>
                                    </div>
                                    {showBtn ? "" :
                                        <div>
                                            <p>{player.leaguePoints}</p>
                                        </div>
                                    }
                                    <div>
                                        <p>${player.value}</p>
                                    </div>



                                {showBtn ? 
                                    <div className="select_player_div">
                                        <button className="select_player_btn" onClick={() => props.callback(player)}>{props.btnText || "Select Player"}</button>
                                    </div>
                                : ""}
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
