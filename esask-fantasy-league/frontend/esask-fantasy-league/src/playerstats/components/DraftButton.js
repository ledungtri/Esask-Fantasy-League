import React from "react";


export default function DraftButton(props) {
    function handleClick() {
    console.log("hey")

}
    if(props.loggedin) {
    return <button className="select_player_btn" onClick={handleClick}>Draft this player</button>
    }
}

