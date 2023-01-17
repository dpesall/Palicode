import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Palicode from './Palicode';
import TicTacToe from './TicTacToe';

/* eslint-disable */

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Palicode />} />
                <Route path="tic-tac-toe" element={<TicTacToe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;