import React, { useState, useRef, useEffect } from 'react'
import '../styles/game.css'
import PlayerInfo from './PlayerInfo'
import throttle from './Util';
import toast, { Toaster } from 'react-hot-toast';

export default function Game({ socket, goToCredentials, clientNumber }) {

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
    const [gameInfo, setGameInfo] = useState({
        usernames: ["", ""],
        score: [0, 0]
    })
    const [ready, setReady] = useState([false, false])

    const gameContainer = useRef(null)
    const FPS = 20;

    useEffect(() => {
        socket.on('gameState', updateGameState);
        socket.on('gameInfo', updateGameInfo);
        socket.on('playerLeft', handlePlayerLeft);
        socket.on('hostLeft', handleHostLeft);
        socket.emit('getGameInfo');

        return () => {
            socket.off('gameState');
            socket.off('gameInfo');
            socket.off('playerLeft');
            socket.off('hostLeft');
        }
    }, [])

    function handleMouseMove(e) {
        updatePostion(e.clientY);
    }

    const updatePostion = throttle((clientY) => {
        const paddlePos = ((clientY - gameContainer.current.offsetTop) / gameContainer.current.clientHeight) * 100
        socket.emit('updatePaddle', paddlePos);
    }, 1000 / FPS)

    function updateGameState(state) {
        state = JSON.parse(state);
        setGameState(state);
    }

    function updateGameInfo(gameInfo) {
        setGameInfo(gameInfo);
    }

    function handlePlayerLeft(playerTwoName) {
        toast.error(`${playerTwoName} left the game`);
    }

    function handleHostLeft() {
        goToCredentials("Host left the game");
    }

    return (
        <div className="main-game-container">
            <div className="deatils-bar">
                <PlayerInfo clientNumber={clientNumber} gameInfo={gameInfo} leftSide={true} ready={ready} setReady={setReady} />
                <div className="score-container">
                    {`${gameInfo.score[0]} | ${gameInfo.score[1]}`}
                </div>
                <PlayerInfo clientNumber={clientNumber} gameInfo={gameInfo} leftSide={false} ready={ready} setReady={setReady} />
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
            <Toaster />
        </div>
    )
}
