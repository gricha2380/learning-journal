let checkforShip = (player,coordinateGuess) => {
    let ship, shipPresent;
    for (let i=0;i<player.ships.length;i++) {
        ship = player.ships[i];
        shipPresent = ship.locations.filter((shipCoordinates)=>{
            return (shipCoordinates[0]===coordinateGuess[0] && shipCoordinates[1]===coordinateGuess[1])
        })[0]

        if(!shipPresent) {
            return false;
        }
    }
}

module.exports.checkforShip = checkforShip;