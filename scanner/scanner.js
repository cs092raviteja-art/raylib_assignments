function direction(x, start, end) {
    if (x === start || x === end) {
        return -1;
    }
    return 1;

}
// function move(x, start, end){
//     let direc = "left";
//     direc = direction(x, start, end, direc)
//     return direc === "left" ? x + 1 : x - 1; 
// }

module.exports = {
    direction,
}