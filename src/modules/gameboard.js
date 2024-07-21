import ship from './ship';

const gameboard = () => {
    let grid = [];

    // create grid
    for (let y = 0; y < 10; y += 1) {
        grid[y] = [];
        for (let x = 0; x < 10; x += 1) {
            grid[y][x] = null;
        }
    }

    const ships = [];
    const placedShips = [null, null, null, null, null];

    // create ships
    ships.push(ship(5));
    ships.push(ship(4));
    ships.push(ship(3));
    ships.push(ship(3));
    ships.push(ship(2));

    // place ships on the grid
    const placeShip = (shipIndex, axis, y, x) => {
        if (shipIndex > 4 || shipIndex < 0) return false;
        if (placedShips[shipIndex] === true) return false;

        const gridCopy = JSON.parse(JSON.stringify(grid));
        let shipLength = ships[shipIndex].length();

        shipLength -= 1;
        if (axis === 0) {
            while (shipLength !== -1) {
                if (x + shipLength > 9 || grid[y][x + shipLength] !== null) {
                    return false;
                }
                gridCopy[y][x + shipLength] = shipIndex;
                shipLength -= 1;
            }
        } else {
            while (shipLength !== -1) {
                if (y + shipLength > 9 || grid[y + shipLength][x] !== null) {
                    return false;
                }
                gridCopy[y + shipLength][x] = shipIndex;
                shipLength -= 1;
            }
        }
        placedShips[shipIndex] = true;
        grid = gridCopy;
        return true;
    };

    // check whether game is over
    const isGameOver = (shipsArray) => !shipsArray.filter((el) => el.isSunk() === false).length;

    // check whether ship is sunk
    const isShipSunk = (shipElement) => shipElement.isSunk();

    // register attacks
    const receiveAttack = (y, x) => {
        if (grid[y][x] !== null && grid[y][x] !== 'M') {
            const shipIndex = grid[y][x];
            ships[shipIndex].hit();
            isShipSunk(ships[shipIndex]);
            isGameOver(ships);

            return true;
        }
        // register missed shot
        grid[y][x] = 'M';

        return false;
    };

    const getGrid = () => grid;

    return {
        getGrid,
        placeShip,
        receiveAttack,
        isGameOver,
    };
};

export default gameboard;
