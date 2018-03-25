let checkforShip = (player,coordinateGuess) => {
    let ship, shipPresent;
    for (let i=0;i<player.ships.length;i++) {
        ship = player.ships[i];
        shipPresent = ship.locations.filter((shipCoordinates)=>{
            return (shipCoordinates[0]===coordinateGuess[0] && shipCoordinates[1]===coordinateGuess[1])
        })[0]

        if(shipPresent) {
            // return true;
            return ship
        }
    }
    return false;
}

let shipDamage = (ship, coordinateGuess) => {
    ship.damage.push(coordinateGuess);
}

let attackOpponent = (player, coordinateGuess) => {
    let shipLocation = checkforShip(player, coordinateGuess);
    if (shipLocation) {
        shipDamage(shipLocation, coordinateGuess)
    }
}

module.exports.checkforShip = checkforShip;
module.exports.shipDamage = shipDamage;
module.exports.attackOpponent = attackOpponent;