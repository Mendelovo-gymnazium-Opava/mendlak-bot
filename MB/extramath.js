

exports.getRandomInt = getRandomInt;
//Random number generator. This was a pain to deduct.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}