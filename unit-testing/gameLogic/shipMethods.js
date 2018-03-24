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
    // console.log('user guessed',coordinateGuess,typeof coordinateGuess)
    // for (let i=0;i<ship.locations.length;i++) {
    //     console.log('checking location',ship.locations[i], typeof ship.locations[i])
    //     if(ship.locations[i]==[coordinateGuess]) {console.log('it matches!');ship.damage.push(coordinateGuess);}
    // }
    // console.log('ship damage report',ship.damage)
}

let attackOpponent = (player, coordinateGuess) => {
    let shipLocation = checkforShip(player, coordinateGuess);
    if (shipLocation) {
        shipDamage(shipLocation, coordinateGuess)
    }
}
// let attackOpponent = (player, coordinateGuess) => (checkforShip(player, coordinateGuess)) ? shipDamage(player.ships[0], coordinateGuess) : null;


module.exports.checkforShip = checkforShip;
module.exports.shipDamage = shipDamage;
module.exports.attackOpponent = attackOpponent;