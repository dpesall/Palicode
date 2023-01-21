import React from "react";
import "./App.css";

const {useState} = require("react");

/* eslint-disable */

const Square = (props) => {
    return (
        <button className={"square"} onClick={props.onClickEvent}>
            {props.value}
        </button>
    )
}

function Board() {
    const initialSquares = Array(9).fill(null);
    const [squares, setSquares] =  useState(initialSquares);
    const [xIsNext, setXIsNext] = useState(true);
    const [moveCount, setMoveCount] = useState(0);

    const winner = calculateWinner(squares);
    const status = getStatus(moveCount, winner, xIsNext);

    const handleClickEvent = (i) => {
        if(squares[i] != null || calculateWinner(squares) != null) {
            return;
        }
        const newSquares = [...squares];
        newSquares[i] = xIsNext ? 'X' : 'O';
        setXIsNext(!xIsNext);
        setSquares(newSquares);
        setMoveCount(moveCount + 1);
    };

    const resetBoard = () => {
        setSquares(initialSquares);
        setXIsNext(true);
        setMoveCount(0);
    };

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClickEvent={() => handleClickEvent(i)}

            />
        );
    };

    return (
        <div>
            <div className={"status"}>
                {status}
            </div>
            <div  className={"board"}>
                <div className={"board-row"}>
                    {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
                </div>
                <div className={"board-row"}>
                    {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
                </div>
                <div className={"board-row"}>
                    {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
                </div>
            </div>
            <div className={"reset-button"}>
                <button className={"reset"}
                        onClick={() => resetBoard()}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

const Game = () => {
    return (
        <div className={"game"}>
            <div className={"game-title"}>
                Tic-Tac-Toe
            </div>
            <Board/>
        </div>
    );
}

const getStatus = (moveCount, winner, xIsNext) => {
    if(moveCount === 9 && !winner) {
        return `The game is a draw`
    }

    return winner ?
        `Winner: ${winner}` :
        `Next player: ${xIsNext ? 'X' : 'O'}`;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ]

    for(let line of lines) {
        const [a, b, c] = line;
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;