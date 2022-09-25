import React, { useState, useRef, useEffect } from 'react'
import '../styles/game.css'
import PlayerInfo from './PlayerInfo'
import throttle from './Util';
import toast, { Toaster } from 'react-hot-toast';

export default function Game({ socket, goToCredentials }) {

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
    const [usernames, setUsernames] = useState(["", ""])
    const [score, setScore] = useState([0, 0])

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
        setUsernames(gameInfo.usernames);
        setScore(gameInfo.score);
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
                <PlayerInfo leftSide={true} playerName={usernames[0]} wins="Wins : 0" />
                <div className="score-container">
                    {`${score[0]} | ${score[1]}`}
                </div>
                <PlayerInfo leftSide={false} playerName={usernames[1]} wins="Wins : 0" />
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
