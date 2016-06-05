var expect = require('chai').expect;
var Haikufy = require('../lib/haikufy');

var haikufy = new Haikufy();

describe('Haikus', function(){
    
    describe('with single sentences', function(){
        
        it('should identify the haiku with no punctuation', function(){
             var input = 'In a pouch I   grow on a southern continent strange creatures I know';
             var expected = [
                 'In a pouch I grow',
                 'on a southern continent',
                 'strange creatures I know'
             ];
             
             expect(haikufy.find(input)).to.exist;
             expect(haikufy.find(input)).to.deep.equal.expected;
        });
    })
});