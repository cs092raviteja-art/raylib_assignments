function changeDirection(x, start, end) {
    if (x === start || x === end) {
        return -1;
    }
    return 1;

}

function doFieldsOverlap(f1_start, f1_end, f2_start, f2_end) {
    f2_start -= (f1_end - f1_start);
    f2_end += (f1_end - f1_start);

    return (f1_start >= f2_start) && (f1_end <= f2_end) ? true : false;
}

function changeSign(currentPos, startsAt, endsAt, speed) {
    return speed * changeDirection(currentPos, startsAt, endsAt);
}

function calcEnd(spaceLength, scanBeginsAt, scanLength, scanSpeed) {
    const end = (spaceLength - scanLength) - (spaceLength - scanLength) % scanSpeed
    return end + scanBeginsAt % scanSpeed;
}

module.exports = {
    direction: changeDirection,
    doFieldsOverlap,
    changeSign,
    calcEnd,
}