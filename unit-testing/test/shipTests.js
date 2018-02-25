let expect = require('chai').expect;

// describe functionn represents a test suite
describe('check for ship',()=>{
    let checkforShip = require('../gameLogic/shipMethods').checkforShip;
    it('should show no ship at a given coordinate for specified player',()=>{
        let player = {
            "ships" : [
                {
                    "locations": [[0,0]]
                }
            ]
        }
        expect(checkforShip(player,[3,3])).to.be.false;
    })
})