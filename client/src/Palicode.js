import React from "react";
import "./App.css";

/* eslint-disable */

function Board() {

    return (
        <div>
            <div className={"word-hint"}>

            </div>
        </div>
    );
}

const Game = () => {
    return (
        <div className={"game"}>
            <div className={"game-title"}>
                Palicode
            </div>
            <Board/>
        </div>
    );
}

export default Game;