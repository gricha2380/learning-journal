let checkforShip = require('./shipMethods.js').checkforShip;

let random = (max) => Math.floor(Math.random() * max)

let validateLocation = (player, coordinates) => {
  let x = coordinates[0];
  let y = coordinates[1];

  let spaceAvailable = !checkforShip(player, coordinates);

  if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
    return spaceAvailable; // decides whether this valid space is occupied
  } else {
    return false;
  }
}

let validateLocations = (player, locations) => {
  let validated = locations.map(function (location) {
    return validateLocation(player, location);
  });
  return validated.indexOf(false) === -1;
}

let placeShip = (player, ship, startingCoordinates, direction) => {
    if (!direction) throw Error('Direction not specified');
  let proposedLocations = [];
  let previousLocation,
    rowNumber,
    columnNumber;

  for (let i = 0; i < ship.size; i++) {
    previousLocation = proposedLocations[i - 1] || [];
    rowNumber = previousLocation[0];
    columnNumber = previousLocation[1];
    
    proposedLocations[i] = (i === 0)
      ? startingCoordinates
      : (direction === 'horizontal')
        ? [rowNumber, ++columnNumber]
        : [++rowNumber, columnNumber];
  }
  
  if (validateLocations(player, proposedLocations)) {
    ship.locations = proposedLocations;
  } else {
    return false;
  }
}

let computerFire = (player) => {
    var x = random(9);
    var y = random(9);
    var coordinates = [x, y];
    fire(player, coordinates);
}
  
let computerPlaceShip = (player, ship) => {
    var direction = Math.random() > 0.5
        ? 'horizontal'
        : 'vertical';
    var x = random(9);
    var y = random(9);
    var coordinates = [x, y];
    placeShip(player, ship, coordinates, direction);
}

module.exports = {
  placeShip: placeShip,
  validateLocations: validateLocations,
  validateLocation: validateLocation,
  computerPlaceShip: computerPlaceShip,
  computerFire: computerFire
};