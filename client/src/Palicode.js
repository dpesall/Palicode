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
    const [completed, setCompleted] = useState(0);

    const [visible, setVisible] = useState(true);
    const [isTimerRunning, setTimerState] = useState(false);

    const [word, setWord] = useState('');
    const [wordColor, setWordColor] = useState('white');
    const [resetColor, setResetColor] = useState('#262732');

    const [squares, setSquares] =  useState(initialSquares);
    const [wordLength, setWordLength] = useState(defaultWordLength);
    
    const [timer, setTimer] = useState('00:00:00');

    const [tenthSeconds, setTenthSeconds] = useState(0);
    const [initTime, setInitTime] = useState(0);
    const [timeBuffer, setTimeBuffer] = useState(0);

    const [isActive, setIsActive] = useState(false);

    const getNewWord = useEffect(() => {
        fetch('/api/retrieve-word')
            .then((res) => res.json())
            .then((data) => updateWordData(data))
    }, [completed]);

    const appendZeros = (digit) => {
        return digit < 10 ? '0' + digit : '' + digit;
    }

    const formatTime = (tSeconds) => {
        let totalTime = Date.now() - (initTime + timeBuffer);
        let hours = Math.floor(totalTime / 3600000) % 60;
        let minutes = Math.floor(totalTime / 60000) % 60;
        let seconds = Math.floor(totalTime / 1000) % 60;

        let timeString = `${appendZeros(hours)}:${appendZeros(minutes)}:${appendZeros(seconds)}`;
        setTimer(timeString);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            formatTime(tenthSeconds + 1);
            setTenthSeconds(tenthSeconds => tenthSeconds + 1);
          }, 100);
        } else if (!isActive && tenthSeconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, tenthSeconds]);

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [count, squares]);

    const handleTimer = (shouldRun) => {
        if(!isActive) {
            setInitTime(Date.now());
            setIsActive(true);
        }
    }

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
            if(!isTimerRunning) {
                handleTimer(true);
            }
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
                        setIsActive(false);
                        setCount(0);
                        setTimeout(() => {
                            setVisible(true);
                            setIsActive(true);
                            setTimeBuffer(timeBuffer + 1000);
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

    const StatsBox = (props) => {

        const calculateWordsPerMinute = () => {
            let totalTime = Date.now() - (initTime + timeBuffer);
            let minutes = totalTime / 60000;

            return (completed / minutes).toFixed(2);
        }

        const StatsRow = (props) => {
            return (
                <div className={"container-fluid stats-row"}>
                    <div className={"row"}>
                        <div className={"col-sm"} style={{borderRight: '3px black solid'}}>
                            {props.label}
                        </div>
                        <div className={"col-sm"}>
                            {props.value}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={"stats-box"}>
                <div className={"stats-header"}>
                    Game Stats
                </div>
                <StatsRow
                    label="Duration:"
                    value={timer}
                />
                <StatsRow
                    label="Word Count:"
                    value={completed}
                />
                <StatsRow
                    label="Words/Minute:"
                    value={calculateWordsPerMinute()}
                />
            </div>
        );
    }

    const Reset = () => {
        return (
            <div className={"reset-area"}>
                <button className="reset-button" style={{backgroundColor: resetColor}} onClick={() => setResetColor('#222222')}>
                    Reset
                </button>
            </div>
        );
    }

    const Board = () => {

        const wordSquares = [];
        for (let i = 0; i < wordLength; i++) {
            wordSquares.push(<Square key={"word:" + i} value={word[i]}/>);
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
            <br/>
            <StatsBox/>
            <br/>
            <Reset/>
        </div>
    );
}

export default Game;