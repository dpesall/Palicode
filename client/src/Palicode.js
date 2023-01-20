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
    const [completed, setCompleted] = useState(0);
    const [wordColor, setWordColor] = useState('white');
    const [squares, setSquares] =  useState(initialSquares);
    const [wordLength, setWordLength] = useState(defaultWordLength);
    const [visible, setVisible] = useState(true);

    const fadeStyle = {
        color: wordColor,
    }

    const getNewWord = useEffect(() => {
        fetch('/api/retrieve-word')
            .then((res) => res.json())
            .then((data) => updateWordData(data))
    }, [completed]);

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
            setWordColor('white');
        }
    };

    const handleKeyPress = (event) => {
        if(count < wordLength && event.key.match(/[a-z]|[A-Z]/i)) {
            const newSquares = [...squares];
            newSquares[count] = event.key;
            setSquares(newSquares);
            if(count == wordLength - 1) {
                for(let i = 0; i < wordLength; i++) {
                    if(newSquares[i] !== word[i]) {
                        setWordColor('red');
                        break;
                    }
                    if(i === wordLength - 1) {
                        setWordColor('#00d142');
                        setVisible(false);
                        setCount(0);
                        setTimeout(() => {
                            setVisible(true);
                            setSquares(initialSquares);
                            setCompleted(completed + 1);
                        }, 1000);
                        return;
                    }
                }
            } else {
                setWordColor('white');
            }
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
                <div className={"word-hint word-row"}>
                    Word: {word}
                </div>
                <div className={"board-row word-row no-pointer"}>
                    {wordSquares}
                </div>
                <br/>
                <div className={"board-row word-row " + (visible ? '' : 'fade-quick')} style={{color: wordColor}}>
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