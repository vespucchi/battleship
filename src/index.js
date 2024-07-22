/* eslint-disable import/extensions */
import './index-style.css';
import player from './modules/player.js';
import ship from './modules/ship.js';

// create players
const p1 = player();
const p2 = player();

p1.board.placeShip(0, 0, 0, 0);
p1.board.placeShip(4, 0, 8, 4);
p1.board.placeShip(2, 0, 5, 4);
p1.board.placeShip(1, 1, 3, 9);
p1.board.placeShip(3, 1, 2, 0);

p2.board.placeShip(0, 0, 0, 0);
p2.board.placeShip(4, 0, 8, 4);
p2.board.placeShip(2, 0, 5, 4);
p2.board.placeShip(1, 1, 3, 9);
p2.board.placeShip(3, 1, 2, 0);

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
        const shipIndex = p1.board.getGrid(y, x);
        console.log(y, x);
        console.log(shipIndex);
        console.log(p1.board.isShipSunk(shipIndex));
        console.log(p1.board.isGameOver());
    }

    renderBoards();
};

// handle board clicks
const enemyBoard = document.querySelector('.right-board');
enemyBoard.addEventListener('click', (event) => {
    const y = event.target.dataset.indexY;
    const x = event.target.dataset.indexX;

    // check whether cell was already attacked
    if (p2.board.getCellStatus(y, x) !== null) return;

    // execute the player shot
    if (p2.board.receiveAttack(y, x)) {
        const shipIndex = p2.board.getGrid(y, x);
        console.log(shipIndex);
        console.log(p2.board.isShipSunk(shipIndex));
        console.log(p2.board.isGameOver());
    }

    // execute random PC shot
    executePcShot();
});

renderBoards();
