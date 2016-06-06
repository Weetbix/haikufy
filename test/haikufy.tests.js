var expect = require('chai').expect;
var Haikufy = require('../lib/haikufy');

var haikufy = new Haikufy();

describe('Haikus', () => {
    
    describe('with single sentences', () => {
        
        it('should identify the haiku with no punctuation', () =>{
             var input = 'In a pouch I grow on a southern continent strange creatures I know';
             var expected = [
                 'In a pouch I grow',
                 'on a southern continent',
                 'strange creatures I know'
             ];
             
             expect(haikufy.find(input)).to.exist;
             expect(haikufy.find(input)).to.deep.equal(expected);
        });
        
        it('should identify the haiku with punctuation', () => {
             var input = 'In a pouch I grow, on a southern continent! strange creatures I know.';
             var expected = [
                 'In a pouch I grow,',
                 'on a southern continent!',
                 'strange creatures I know.'
             ];
             
             expect(haikufy.find(input)).to.exist;
             expect(haikufy.find(input)).to.deep.equal(expected);
        });
        
        it('should identify clear whitespace at the ends of stanzas', () => {
             var input = 'In a pouch I grow     on a southern continent    strange creatures I know';
             var expected = [
                 'In a pouch I grow',
                 'on a southern continent',
                 'strange creatures I know'
             ];
             
             expect(haikufy.find(input)).to.exist;
             expect(haikufy.find(input)).to.deep.equal(expected);
        });
        
        describe('where syllable breaks are not ends of words', () => {
            it('should not be identified as a haiku in first split', () => {
                // Stanza now goes 6 - 6 - 5
                //                    5/6   <- 5/6 split is on a word, this shouldnt be a haiku
                var input = 'a a a a mammoth   a a a a a a   a a a a a';

                expect(haikufy.find(input)).to.be.null;
            });
            
            it('should not be identified as a haiku in second split', () => {
                // Stanza now goes 5 - 8 - 4
                //                                   12/13 <- split on word
                var input = 'a a a a a  b b b b b b mammoth  a a a a';

                expect(haikufy.find(input)).to.be.null;
            });
            
            it('should not be identified as a haiku when both splts are words', () => {
                // Stanza now goes 5 - 8 - 4
                //                                   12/13 <- split on word
                var input = 'a a a a mammoth   a a a a a mammoth   a a a a';

                expect(haikufy.find(input)).to.be.null;
            });
        })
    })
    
    describe('real examples', () => {
        describe('that should fail', () => {
            const test_cases = [
                `also discovered there's a huge custom dlc forum with shitloads of songs`
            ];
            
            test_cases.forEach( (test, index) => {
                index++;
                it(`test case ${index} should not be identified as a haiku`, () => {
                    expect(haikufy.find(test)).to.be.null;
                });
            })
        });
    });
});