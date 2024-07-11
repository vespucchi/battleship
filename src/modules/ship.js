const ship = (len) => {
    const shipLength = len;
    let hitCount = 0;

    const length = () => shipLength;

    const hit = () => {
        hitCount += 1;
        return hitCount;
    };

    const isSunk = () => hitCount === shipLength;

    return { length, hit, isSunk };
};

export default ship;
