import { INITIAL_VELOCITY, INCREASE_VELOCITY, INITIAL_POSITION } from './constants.js';

function createGameState() {
    return {
        players: [{
            y: INITIAL_POSITION
        }, {
            y: INITIAL_POSITION
        }],
        ball: {
            x: INITIAL_POSITION,
            y: INITIAL_POSITION,
            direction: {
                x: 0,
                y: 0
            },
            velocity: INITIAL_VELOCITY
        }
    };
}

function initGame() {
    const state = createGameState();
    state.ball.direction = getBallDirection();
    return state;
}

function resetGame(state) {
    state.players[0].y = INITIAL_POSITION;
    state.players[1].y = INITIAL_POSITION;
    state.ball.x = INITIAL_POSITION;
    state.ball.y = INITIAL_POSITION;
    state.ball.direction = getBallDirection();
    state.ball.velocity = INITIAL_VELOCITY;
}

function gameLoop(state) {
    if (!state) return;

    const player1 = state.players[0];
    const player2 = state.players[1];
    const ball = state.ball;

    ball.x += ball.direction.x * ball.velocity;
    ball.y += ball.direction.y * ball.velocity;

    state.ball.velocity += INCREASE_VELOCITY;

    if (ball.y < 0 || ball.y > 100) {
        ball.direction.y *= -1;
    }

    if (ball.x <= 4 && isCollision(player1.y, ball.y)) {
        ball.direction.x *= -1
    }

    if (ball.x >= 96 && isCollision(player2.y, ball.y)) {
        ball.direction.x *= -1
    }

    if (ball.x > 100) {
        return 1;
    }

    if (ball.x < 0) {
        return 2;
    }

    return false;
}

function isCollision(p, y) {
    return y >= p - 9 && y <= p + 9
}

function getBallDirection() {
    let direction = {
        x: 0,
        y: 0
    }
    while (
        Math.abs(direction.x) <= 0.2 ||
        Math.abs(direction.x) >= 0.9
    ) {
        const heading = randomNumberBetween(0, 2 * Math.PI)
        direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    return direction
}

function randomNumberBetween(min, max) { return Math.random() * (max - min) + min }

export {
    initGame,
    gameLoop,
    resetGame
}