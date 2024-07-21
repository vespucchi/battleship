import gameboard from './gameboard';

const player = (_type) => {
    const type = _type;
    const board = gameboard();

    const playerType = () => type;

    return { playerType, board };
};

export default player;
