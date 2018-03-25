let expect = require('chai').expect;

describe('PLAYER METHODS', ()=>{
  describe('validateLocation', ()=>{
    let validateLocation = require('../gameLogic/playerMethods.js').validateLocation;
    let player;

    beforeEach(()=>{
      player = {
        ships: [
          {
            locations: [[9, 9]]
          }
        ]
      };
    });

    xit('shoud confirm valid for unoccupied locations in range', ()=>{
      let location = [0, 0];
      let actual = validateLocation(player, location);

      expect(actual).to.be.ok;
    });

    it('shoud confirm INvalid for occupied locations in range', ()=>{
      let location = [9, 9];
      let actual = validateLocation(player, location);

      expect(actual).to.be.false;
    });

    it('shoud confirm INvalid for UNoccupied locations OUT of range', ()=>{
      let locationHigh = [10, 10];
      let locationLow = [-1, -1];

      expect(validateLocation(player, locationHigh)).to.be.false;
      expect(validateLocation(player, locationLow)).to.be.false;
    });
  });

  describe('validateLocations', ()=>{
    let validateLocations = require('../gameLogic/playerMethods.js').validateLocations;
    let player;

    beforeEach(()=>{
      player = {
        ships: [
          {
            locations: [[0, 0]]
          }
        ]
      };
    });

    it('should correctly report a list of unoccupied locations is valid', ()=>{
      let locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
      expect(validateLocations(player, locations)).to.be.ok;
    });

    it('should correctly report a a problem if any location in the list is invalid', ()=>{
      let locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
      expect(validateLocations(player, locations)).to.be.false;

      locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
      expect(validateLocations(player, locations)).to.be.false;
    });
  });

  describe('placeShip', ()=>{
    let placeShip = require('../gameLogic/playerMethods.js').placeShip;
    let player;

    beforeEach(()=>{
      player = {
        ships: [
          {
            size: 1,
            locations: []
          },
          {
            size: 2,
            locations: [[1, 0], [1, 1]]
          }
        ]
      };
    });

    it('should update a ship with a valid starting location', ()=>{
      let ship = player.ships[0];
      let coordinates = [0, 1];

      placeShip(player, ship, coordinates, 'horizontal');
      let actual = ship.locations;

      expect(actual).to.be.ok;
      expect(actual).to.have.length(1);
      expect(actual[0]).to.deep.equal([0, 1]);
    });

    it('should throw an error if no direction is specified',()=>{
    let ship = player.ships[0];
    let coordinates = [0, 1];

    let handler = ()=>{placeShip(player,ship,coordinates)}
    expect(handler).to.throw(Error)
    expect(handler).to.throw('Direction not specified')

    })
  });
});