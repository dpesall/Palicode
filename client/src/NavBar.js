import React from "react";
import "./App.css";

const {useState} = require("react");

/* eslint-disable */

const NavBar = () => {

    const recolor = (itemName) => {
        setColor({
            home: itemName === 'Palicode' ? 'cyan' : 'white',
            ticTacToe: itemName === 'Tic-Tac-Toe' ? 'cyan' : 'white'
        });
    }

    const [navColor, setColor] = useState({
        home: 'white',
        ticTacToe: 'white'
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark .bg-transparent">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active show-pointer"
                               style={{color: navColor.home}}
                               href={"/"}
                               onMouseOver={() => recolor('Palicode')}
                               onMouseOut={() => recolor('')}
                               >Palicode</a>
                        </li>
                        <li className=".nav-item-last">
                            <a className="nav-link active show-pointer"
                               style={{color: navColor.ticTacToe}}
                               href={"/Tic-Tac-Toe"}
                               onMouseOver={() => recolor('Tic-Tac-Toe')}
                               onMouseOut={() => recolor('')}
                               >Tic-Tac-Toe</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;