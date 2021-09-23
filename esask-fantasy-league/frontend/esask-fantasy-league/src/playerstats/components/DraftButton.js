import React from "react";


export default function DraftButton(props) {
    function handleClick() {
        console.log("hey");
        props.onClose(false);
    }
    if(props.loggedin) {
    return (<button data-testid="draftbtn" className="select_player_btn" onClick={handleClick}>Draft this player</button>
    )}
}

