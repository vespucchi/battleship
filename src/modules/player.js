import gameboard from './gameboard';

const player = (_type) => {
    const type = _type;
    const board = gameboard();

    const playerType = () => type;

    const getBoard = () => board;

    return { playerType, getBoard };
};

export default player;
