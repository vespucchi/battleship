/* eslint-disable import/extensions */
import './index-style.css';
import './modules/modal-style.css';
import player from './modules/player.js';


// game controller
const gameController = () => {
    const modal = document.querySelector('#game-over');
    const desc = modal.querySelector('.game-over-desc');
    const restartBtn = modal.querySelector('#restart');
    const player1ScoreElement = document.querySelector('.player-one-score');
    const player2ScoreElement = document.querySelector('.player-two-score');

    let scoreP1 = 0;
    let scoreP2 = 0;

    // start new round
    const startNewRound = () => {
        // create players
        const p1 = player();
        const p2 = player()

        const placeShips = () => {
            // place first player ships
            for (let i = 0; i < 5; i += 1) {
                for (; ;) {
                    if (p1.board.placeShip(
                        i,
                        Math.floor(Math.random() * 2),
                        Math.floor((Math.random() * 123) % 10),
                        Math.floor((Math.random() * 987) % 10),
                    )) break;
                }
            }

            // place second player ships
            for (let i = 0; i < 5; i += 1) {
                for (; ;) {
                    if (p2.board.placeShip(
                        i,
                        Math.floor(Math.random() * 2),
                        Math.floor((Math.random() * 456) % 10),
                        Math.floor((Math.random() * 654) % 10),
                    )) break;
                }
            }
        };

        // handle game over
        const showGameOver = (winner) => {
            desc.textContent = winner === 'p1' ? 'You won :)' : 'Enemy won :(';
            modal.showModal();

            winner === 'p1' ? scoreP1 += 1 : scoreP2 += 1;
            player1ScoreElement.textContent = scoreP1;
            player2ScoreElement.textContent = scoreP2;
        };

        const boards = document.querySelectorAll('.board');
        const renderBoards = () => {
            boards.forEach((el, index) => {
                const board = el;
                board.textContent = '';
                if (index === 0) {
                    for (let i = 0; i < 10; i += 1) {
                        for (let j = 0; j < 10; j += 1) {
                            const cell = document.createElement('div');
                            cell.classList.add('board-cell');
                            if (p1.board.getCellStatus(i, j) === 'M') cell.classList.add('missed');
                            else if (p1.board.getCellStatus(i, j) === 'H') cell.classList.add('hit');
                            else if (p1.board.getGrid(i, j) === null) cell.classList.toggle('empty');
                            board.append(cell);
                        }
                    }
                } else {
                    for (let i = 0; i < 10; i += 1) {
                        for (let j = 0; j < 10; j += 1) {
                            const cell = document.createElement('div');
                            cell.classList.add('board-cell');
                            if (p2.board.getCellStatus(i, j) === 'M') cell.classList.add('missed');
                            else if (p2.board.getCellStatus(i, j) === 'H') cell.classList.add('hit');
                            cell.dataset.indexY = `${i}`;
                            cell.dataset.indexX = `${j}`;
                            board.append(cell);
                        }
                    }
                }
            });
        };

        // execute random PC shot
        const executePcShot = () => {
            let y;
            let x;
            for (; ;) {
                y = Math.floor(Math.random() * 10);
                x = Math.floor(Math.random() * 10);
                if (p1.board.getCellStatus(y, x) === null) break;
            }
            if (p1.board.receiveAttack(y, x)) {
                if (p1.board.isGameOver()) {
                    renderBoards();
                    showGameOver('p2');
                    return;
                }
            }

            renderBoards();
        };

        // handle enemy board clicks
        const enemyBoard = document.querySelector('.right-board');
        const handleEnemyBoardClick = (event) => {
            const y = event.target.dataset.indexY;
            const x = event.target.dataset.indexX;

            // check whether cell was already attacked
            if (p2.board.getCellStatus(y, x) !== null) return;

            // execute the player shot
            if (p2.board.receiveAttack(y, x)) {
                if (p2.board.isGameOver()) {
                    enemyBoard.removeEventListener('click', handleEnemyBoardClick);
                    event.target.classList.add('hit');
                    showGameOver('p1');
                    return;
                }
            }

            // execute random PC shot
            executePcShot();
        };

        enemyBoard.addEventListener('click', handleEnemyBoardClick);

        placeShips();
        renderBoards();
    };

    // add event listener for restart button
    restartBtn.addEventListener('click', () => {
        modal.close();
        startNewRound();
    });

    startNewRound();
};

gameController();
