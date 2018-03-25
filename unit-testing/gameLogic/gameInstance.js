let attackOpponent = require('./shipMethods.js').attackOpponent;

let checkGameStatus = (players) => {
	return false;
}
let takeTurn = (opposingPlayer, guessFunction) => {
    let coordinates = guessFunction();
    attackOpponent(opposingPlayer, coordinates);
    let gameOver = checkGameStatus();
    return gameOver;
}
module.exports.checkGameStatus = checkGameStatus;
module.exports.takeTurn = takeTurn;