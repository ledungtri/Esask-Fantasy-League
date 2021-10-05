
/*
    Component that renders the list of player has gotten from the playerlist api

    Contains functionality for search bar component, to return the list of players matching search queries
*/
import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import Paginate from './Pagination';
import Playerstats from "../../playerstats/pages/Playerstats";
import backendHost from "../../api/backendHost";
import SearchBar from '../../Search Bar/components/SearchBar';

function PlayerList(props) {
    const [playerList, setPlayerList] = useState([]);
    const [searchBy, setSearchBy] = useState("name");
    const [loading, setLoading] = useState(false);
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [summoner, setSummoner] = useState();
    const [showError, setShowError] = useState(false);
    const [showNoMatch, setShowNoMatch] = useState(false);
    const [page, setPage] = useState(1);
    const playersPerPage = 35;
    const title = props.title || "List Of Players";
    const showBtn = props.showBtn || false;
    const hideSearch = props.hideSearch || false;
    const showBtnCapt = props.showBtnCapt || false;


    // get the list of players from the backend
    async function fetchPlayersList(){
        setLoading(true);
        const res = await fetch(backendHost.BACKEND_HOST + "/api/playerlist");
        res.json().then(res => setPlayerList(res));
        setLoading(false);
    }

    // call the fetch function using useEffect
    useEffect(() => {
        if(!props.players){
            fetchPlayersList();
        }else{
            setPlayerList(props.players)

        }

    },[])

    // function to filter list by search text
    const getSearchList=  (searchValue)=>{
        try{
            console.log(searchValue);
            console.log(searchBy);
            setShowError(false);
            let filteredList = [];
            if(searchBy === "name"){
                console.log("over here")
                filteredList = playerList.filter(player => {
                    return player.summonerName.toLowerCase().includes(searchValue.toLowerCase())
                   });
            } 
            if (searchBy === "salary"){
                console.log("over here2")
                filteredList = playerList.filter(player => {
                    return player.value.toString() === searchValue
                   });
            }
            

            if(filteredList.length == 0){
                console.log("over here3")
                setShowNoMatch(true);
            }
            console.log("over here4")
            setPlayerList(filteredList);
        }catch(err){
            console.log("over here5")
            setShowError(true);
        }

    }
    
    // function to return to full list
    const clearSearch =(setClear) => {
        setClear("");
        fetchPlayersList()
    }

    // pagination calculations
    const startIndex = (page - 1) * playersPerPage;
    const current = playerList.slice(startIndex,startIndex + playersPerPage);
    const totalPages = Math.ceil(playerList.length/playersPerPage);

    // function to handle pagination
    const handlePaginate = (number) => {
        setPage(number);
    }

    // function to show player details
    const showPlayerDetails = (player) =>{
        setShowPlayerStats(true);
        console.log(player);
        setSummoner(player);
    }

    // function to close player details.
    const handleClose = () =>{
        setShowPlayerStats(false);
    }




    return (
        <div className="player_list">

            {/* ----------------------------------------- Player details ------------------------------------------ */}
            {showPlayerStats ? <Playerstats
                summonerId={summoner.summonerId}
                show={showPlayerStats}
                handleClose={handleClose}
                handleDraftPlayer={() => props.callback(summoner)}
                loggedin={false}
                startDate={null}
                endDate={null}
                /> : ""}

            {/* ----------------------------------------- Page title ------------------------------------------ */}
            <div>
                <div className="title">
                    <h3 data-testid="title">{title}</h3>
                </div>

                {/* ----------------------------------------- Filter and Search Bar ------------------------------------------ */}
                {hideSearch ? "":
                (<div>
                    <div className="filter_option">
                        <label>Search By</label>
                            <select onChange={(e) => setSearchBy(e.target.value)}>
                                <option value="name">Name</option>
                                <option value="salary">Salary</option>
                            </select>
                    </div>
                    <SearchBar getSearchText={getSearchList} clear={clearSearch} showError={showError} /> 
                </div>)}
                

                {/* ----------------------------------------- List heading ------------------------------------------ */}
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

                {/* ----------------------------------------- Loading component ------------------------------------------ */}
                {loading? <Loading message="loading..." /> : ""}


                {/* ----------------------------------------- Player list ------------------------------------------ */}
                {showNoMatch? <h4 className="no_match">No Match Found</h4> : null}
                    {current.map(player => (
                        <div className={showBtn ? "listing width_90" : "listing hover width_50"} >
                            <div key={player.summonerId}>
                                    <div>
                                        <p>{player.pos}</p>
                                    </div>
                                    <div className= "player_name width">
                                        <a className="width" href="#" onClick={()=>showPlayerDetails(player)}>
                                            <p className="width">{player.summonerName}</p>
                                        </a>
                                        {player.isCaptain && showBtnCapt?
                                            <span className="captain_indicator">
                                                C
                                            </span>
                                        :""}
                                    </div>
                                    {showBtn ? "" :
                                        <div>
                                            <p>{player.leaguePoints}</p>
                                        </div>
                                    }
                                    <div>
                                        <p>${player.value}</p>
                                    </div>


                        {/* ---------------------------------- Select player button ---------------------------- */}
                                {showBtn ?
                                    <div className="select_player_div">
                                        <button className="select_player_btn" onClick={() => props.callback(player)}>{props.btnText || "Select Player"}</button>
                                    </div>
                                : ""}
                            </div>
                        </div>
                    ))}
                    {/* ----------------------------------------- Pagination ------------------------------------------ */}
                    <div className="pagination">
                        <p>Page {page} of {totalPages}</p>
                        <Paginate totalPages={totalPages} handlePaginate={handlePaginate} />
                    </div>        
        
                    </div>
        
                </div>
            )
        }
        
        export default PlayerList
        