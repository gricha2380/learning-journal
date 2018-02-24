let expect = require('chai').expect;
// to run: node testTransforms.js
expect(true).to.be.true;


// let titleCase = (title) => {title}
function titleCase(title) {
    let words = title.split(' ');
    // console.log('current split',words)
    let titleCaseWords = words.map(function(word){
        return word[0].toUpperCase() + word.substring(1);
    })
    // console.log('current split after',titleCaseWords)
    return titleCaseWords.join(' ');
}
expect(titleCase('one small step')).to.be.a('string');
expect(titleCase('a')).to.equal('A')
expect(titleCase('world')).to.equal('World')
expect(titleCase('one small step')).to.equal('One Small Step');