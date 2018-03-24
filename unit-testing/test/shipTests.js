let expect = require('chai').expect;

// describe functionn represents a test suite
describe('check for ship',()=>{
    let checkforShip = require('../gameLogic/shipMethods').checkforShip;
    it('should show no ship at a given coordinate for specified player',()=>{
        player = {
            "ships" : [
                {
                    "locations": [[0,0]]
                }
            ]
        }
        expect(checkforShip(player,[3,3])).to.be.false;
    })

    it('ships located at more than one coordinate',()=>{
        player = {
            "ships" : [
                {
                    "locations": [[0,0],[0,1]]
                }
            ]
        }
        // expect(checkforShip(player,[0,1])).to.be.true;
        expect(checkforShip(player,[0,1])).to.deep.equal(player.ships[0])
        expect(checkforShip(player,[0,0])).to.deep.equal(player.ships[0])
        // expect(checkforShip(player,[0,0])).to.be.true;
        expect(checkforShip(player,[3,3])).to.be.false;
    })

    it('checking multiple ships',()=>{
        player = {
            "ships" : [
                {
                    "locations": [[0,0],[0,1]]
                },
                {
                    "locations": [[1,0],[1,1]]
                },
                {
                    "locations": [[2,0],[2,1],[2,2],[2,3]]
                }
            ]
        }
        expect(checkforShip(player,[0,1])).to.deep.equal(player.ships[0])
        expect(checkforShip(player,[0,0])).to.deep.equal(player.ships[0])
        expect(checkforShip(player,[1,0])).to.deep.equal(player.ships[1])
        expect(checkforShip(player,[1,1])).to.deep.equal(player.ships[1])
        expect(checkforShip(player,[2,4])).to.be.false;
        expect(checkforShip(player,[2,3])).to.deep.equal(player.ships[2])
        expect(checkforShip(player,[4,2])).to.be.false;
    })
})


// battle damage
describe('ship damage',()=>{
    let shipDamage = require('../gameLogic/shipMethods').shipDamage;
    it('register damage to a given ship in a given location',()=>{
        let ship = {
            locations: [[0,0]],
            damage: []
        }
        shipDamage(ship,[0,0])
        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0,0]) //because two arrays are not equal
    })
})

//fire at opponent
describe('fire at opponent',()=>{
    let attackOpponent = require('../gameLogic/shipMethods').attackOpponent;
    it('see if damage is given',()=>{
        player = {
            "ships" : [
                {
                    "locations": [[0,1]],
                    "damage":[]
                }
            ]
        }
        
        attackOpponent(player,[0,1])
        expect(player.ships[0].damage).to.not.be.empty;
        expect(player.ships[0].damage[0]).to.deep.equal([0,1])
    })
    
    it('should not record damage if no ship at coordinates',()=>{
        player = {
            "ships" : [
                {
                    "locations": [[0,1]],
                    "damage":[]
                }
            ]
        }
        
        attackOpponent(player,[9,9])
        expect(player.ships[0].damage).to.be.empty;
    })
})