import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import Paginate from './Pagination';
import Title from "../../Home Page/components/Title";

function PlayerList(props) {
    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const playersPerPage = 35;
    const title = "List Of Players";
    const showBtn = props.showBtn || false;

    async function fetchPlayersList(){
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/playerlist");
        res.json().then(res => setPlayerList(res))
        setLoading(false);
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

    return (
        <div>
            <div>
                {props.disableTitle? "" : <Title title={title}/>}
                {loading? <Loading /> : ""}
                {showBtn ? "" :
                    <div className={showBtn ? "listing_heading width_90" :"listing_heading width_50"}>
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
                        <div className={showBtn ? "listing width_90" : "listing hover width_50"} >
                            <div key={player.summonerId}>
                                <div>
                                    <p>{player.pos}</p>
                                </div>
                                <div className= "player_name">
                                    <p className="width">{player.summonerName}</p>
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
