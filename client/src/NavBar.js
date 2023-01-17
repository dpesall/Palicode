import React from "react";
import "./App.css";

/* eslint-disable */

const NavBar = () => {

    const redirect = (destination) => {

    }

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
                            <a className="nav-link active show-pointer" aria-current="page"
                               href={"/"}
                               onClick={() => redirect('Palicode')}>Palicode</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link show-pointer"
                               href={"/Tic-Tac-Toe"}
                               onClick={() => redirect('Tic-Tac-Toe')}>Tic-Tac-Toe</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;