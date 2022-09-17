import React, { useState, useRef, useEffect } from 'react'
import '../styles/game.css'
import PlayerInfo from './PlayerInfo'
import throttle from './Util';

export default function Game({ socket, roomCode, clientNumber }) {

    const [gameState, setGameState] = useState({
        players: [{
            y: 50
        }, {
            y: 50
        }],
        ball: {
            x: 50,
            y: 50
        }
    })

    const gameContainer = useRef(null)
    const FPS = 60;

    useEffect(() => {
        socket.on('gameState', updateGameState);
    }, [])

    function handleMouseMove(e) {
        updatePostion(e.clientY);
    }

    const updatePostion = throttle((clientY) => {
        const paddlePos = ((clientY - gameContainer.current.offsetTop) / gameContainer.current.clientHeight) * 100
        socket.emit('updatePaddle', paddlePos);
    }, 1000 / FPS)

    function updateGameState(state) {
        // console.log(state);
        state = JSON.parse(state);
        setGameState(state);
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
                    style={{ left: `${gameState.ball.x}%`, top: `${gameState.ball.y}%` }}
                ></div>
                <div className="paddle left" id="left-player-paddle"
                    style={{ top: `${gameState.players[0].y}%` }}
                ></div>
                <div className="paddle right" id="right-player-paddle"
                    style={{ top: `${gameState.players[1].y}%` }}
                ></div>
            </div>
        </div>
    )
}
