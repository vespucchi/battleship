/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import gameboard from '../gameboard';

let board;
beforeEach(() => {
    board = gameboard();
});

describe('Placing ships horizontally', () => {
    test('Place ship on the grid', () => {
        expect(board.placeShip(0, 0, 0, 0)).toBeTruthy();
        expect(board.placeShip(4, 0, 8, 4)).toBeTruthy();
        expect(board.placeShip(2, 0, 5, 4)).toBeTruthy();
    });

    test('Place ship on the occupied spot', () => {
        expect(board.placeShip(0, 0, 0, 0)).toBeTruthy();
        expect(board.placeShip(4, 0, 8, 4)).toBeTruthy();
        expect(board.placeShip(1, 0, 0, 0)).toBeFalsy();
        expect(board.placeShip(3, 0, 8, 5)).toBeFalsy();
    });

    test('Place ship too close to the edge', () => {
        expect(board.placeShip(0, 0, 6, 5)).toBeTruthy();
        expect(board.placeShip(1, 0, 7, 7)).toBeFalsy();
    });
});

describe('Placing ships vertically', () => {
    test('Place ship on the grid', () => {
        expect(board.placeShip(0, 1, 0, 0)).toBeTruthy();
        expect(board.placeShip(4, 1, 7, 4)).toBeTruthy();
        expect(board.placeShip(2, 1, 3, 9)).toBeTruthy();
    });

    test('Place ship on the occupied spot', () => {
        expect(board.placeShip(0, 1, 0, 0)).toBeTruthy();
        expect(board.placeShip(2, 1, 3, 9)).toBeTruthy();
        expect(board.placeShip(1, 1, 0, 0)).toBeFalsy();
        expect(board.placeShip(3, 1, 2, 9)).toBeFalsy();
    });

    test('Place ship too close to the edge', () => {
        expect(board.placeShip(0, 1, 0, 0)).toBeTruthy();
        expect(board.placeShip(1, 1, 7, 0)).toBeFalsy();
    });
});

describe('Receiving attack', () => {
    test('Hits the horizontal ship', () => {
        board.placeShip(0, 0, 0, 0);
        expect(board.receiveAttack(0, 0)).toBeTruthy();
        expect(board.receiveAttack(0, 4)).toBeTruthy();
        expect(board.receiveAttack(0, 5)).toBeFalsy();
        expect(board.receiveAttack(1, 0)).toBeFalsy();
    });

    test('Hits the vertical ship', () => {
        board.placeShip(4, 1, 7, 4);
        expect(board.receiveAttack(7, 4)).toBeTruthy();
        expect(board.receiveAttack(8, 4)).toBeTruthy();
        expect(board.receiveAttack(9, 4)).toBeFalsy();
        expect(board.receiveAttack(7, 5)).toBeFalsy();
    });

    test('Are all ships sunk / is game over', () => {
        const shipsArray = [
            { isSunk() { return true; } },
            { isSunk() { return true; } },
            { isSunk() { return true; } },
            { isSunk() { return false; } },
            { isSunk() { return true; } },
        ];
        expect(board.isGameOver(shipsArray)).toBeFalsy();

        const shipsArray2 = [
            { isSunk() { return true; } },
            { isSunk() { return true; } },
            { isSunk() { return true; } },
            { isSunk() { return true; } },
            { isSunk() { return true; } },
        ];
        expect(board.isGameOver(shipsArray2)).toBeTruthy();
    });
});
