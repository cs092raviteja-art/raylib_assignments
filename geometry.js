function calcOffSet(windowD, rectangleD) {
    return (windowD - rectangleD) / 2;
}

function distance(x1, y1, x2, y2) {
    return sqrt(sqr(x1 - x2) + sqr(y1 - y2));
}

function sqr(n) {
    return n * n;
}

function sqrt(n) {
    return n ** 0.5;
}

function areCIntersecting(c1_X, c1_Y, c2_X, c2_Y, c1_R, c2_R) {
    const d = distance(c1_X, c1_Y, c2_X, c2_Y);
    return (c1_R + c2_R) >= d;
}

function congruentDimension(dimension, ratio) {
    return dimension * ratio;
}

module.exports = {
    calcOffSet,
    distance,
    sqr,
    sqrt,
    areCIntersecting,
    congruentDimension,
};