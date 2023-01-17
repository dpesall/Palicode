import React, {useEffect} from "react";
import "./App.css";

const {useState} = require("react");

/* eslint-disable */

const Square = (props) => {
    return (
      <span className={"p-square"}>
          {props.value}
      </span>
    );
}

const Game = () => {
    const defaultWordLength = 8;
    const initialSquares = Array(defaultWordLength).fill(null);
    const [count, setCount] = useState(0);
    const [word, setWord] = useState('');
    const [squares, setSquares] =  useState(initialSquares);
    const [wordLength, setWordLength] = useState(defaultWordLength);

    useEffect(() => {
        fetch('/retrieve-word')
            .then((res) => res.json())
            .then((data) => updateWordData(data))
    }, []);

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [count, squares]);

    const handleKeyDown = (event) => {
        if(count === 0) {
            return;
        }
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const newSquares = [...squares];
            newSquares[count - 1] = '';
            setSquares(newSquares);
            setCount(count - 1);
        }
    };

    const handleKeyPress = (event) => {
        if(count < wordLength && event.key.match(/[a-z]|[A-Z]/i)) {
            const newSquares = [...squares];
            newSquares[count] = event.key;
            setSquares(newSquares);
            setCount(count + 1);
        }
    };

    const updateWordData = (data) => {
        let temp = data.message;
        setWord(temp);
        setWordLength(temp.length);
    }

    const Board = () => {

        const wordSquares = [];
        for (let i = 0; i < wordLength; i++) {
            wordSquares.push(<Square key={'word:' + i} value={word[i]}/>);
        }
        const blankSquares = [];
        for (let i = 0; i < wordLength; i++) {
            blankSquares.push(<Square key={i} value={squares[i]}/>);
        }

        return (
            <div>
                <div className={"word-hint"}>
                    Word: {word}
                </div>
                <div className={"board-row no-pointer"}>
                    {wordSquares}
                </div>
                <br/>
                <div className={"board-row"}>
                    {blankSquares}
                </div>
            </div>
        );
    }

    return (
        <div className={"game"}>
            <br/>
            <div className={"game-title"}>
                Palicode
            </div>
            <br/>
            <Board/>
        </div>
    );
}

export default Game;