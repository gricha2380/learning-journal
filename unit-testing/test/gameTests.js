let expect = require('chai').expect;

describe('GAME INSTANCE FUNCTIONS',  ()=> {
  describe('checkGameStatus',  ()=> {
    let checkGameStatus = require('../gameLogic/gameInstance.js').checkGameStatus;
    it('should tell me when the game is over',  ()=> {
      let players = [
        {
            ships: [
                {
                    locations: [[0, 0]],
                    damage: [[0, 0]]
                }
            ]
        }
      ];
      let actual = checkGameStatus(players);
      expect(actual).to.be.false;
    });
  });

  describe('take turns', ()=>{
      let takeTurn = require('../gameLogic/gameInstance.js').takeTurn;
      let guess, player;
      beforeEach(()=>{
          guess = ()=> [0,0]
          player = {
              ships: [{locations:[[0,0]],damage:[]}]
          }
      })
      it('should return false if game ends', ()=>{
        let actual = takeTurn(player, guess);
        expect(actual).to.be.false;
      })
  })

  // Testing Asynchronous Code
  let saveGame = (callback)=>{
      setTimeout(()=>{
        callback();
      }, 1000)
  }

  describe('save game', ()=>{
      it('should update save status', (done)=>{
          let status = 'game not saved'
          saveGame(()=>{
            status = 'game saved'
            expect(status).to.equal('game saved')
            done();
          })
      })
  })
});