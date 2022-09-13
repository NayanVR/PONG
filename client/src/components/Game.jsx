import React, { useState, useRef, useEffect } from 'react'
import '../styles/game.css'
import PlayerInfo from './PlayerInfo'

export default function Game() {

    const [ballX, setBallX] = useState(50)
    const [ballY, setBallY] = useState(50)
    const [leftPlayerPos, setLeftPlayerPos] = useState(50)
    const [rightPlayerPos, setRightPlayerPos] = useState(50)

    const gameContainer = useRef(null)

    function handleMouseMove(e) {
        setLeftPlayerPos(((e.clientY - gameContainer.current.offsetTop) / gameContainer.current.clientHeight) * 100)
    }

    return (
        <div className="main-game-container">
            <div className="deatils-bar">
                <PlayerInfo leftSide={true} playerName="Nayan" wins="Wins : 0" />
                <div className="score-container">10 | 15</div>
                <PlayerInfo leftSide={false} playerName="Nayan" wins="Wins : 0" />
            </div>

            <div className="game-container" ref={gameContainer} onMouseMove={handleMouseMove}>
                <div className="ball" id="ball"
                    style={{ left: `${ballX}%`, top: `${ballY}%` }}
                ></div>
                <div className="paddle left" id="left-player-paddle"
                    style={{ top: `${leftPlayerPos}%` }}
                ></div>
                <div className="paddle right" id="right-player-paddle"
                    style={{ top: `${rightPlayerPos}%` }}
                ></div>
            </div>
        </div>
    )
}
