/* eslint-disable no-undef */
import ship from '../ship';

let newShip = ship(5);

test('Get ship length', () => {
    expect(newShip.length()).toBe(5);
});

test('Update ship hit count', () => {
    expect(newShip.hit()).toBe(1);
});

test('Is ship sunk', () => {
    newShip = ship(1);
    expect(newShip.isSunk()).toBeFalsy();
    newShip.hit();
    expect(newShip.isSunk()).toBeTruthy();
});
