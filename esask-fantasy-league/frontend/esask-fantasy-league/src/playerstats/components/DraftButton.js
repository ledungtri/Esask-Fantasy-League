import React from "react";


export default function DraftButton(props) {
    if(props.loggedin) {
    return <button data-testid="draftbtn" className="draft_player_btn" onClick={props.handleDraftPlayer}>Draft this player</button>
    }
}

