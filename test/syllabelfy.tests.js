const expect = require('chai').expect;
const Syllablefy = require('../lib/syllablefy');

let syllablefy = new Syllablefy();

function dashesToHyphens(text){
    const allDashesRegex = new RegExp(`-`, 'g');
    return text.replace(allDashesRegex, syllablefy.HYPHEN_CHAR);
}

function hyphensToDashes(text){
    const allHyphensRegex = new RegExp(`${syllablefy.HYPHEN_CHAR}`, 'g');
    return text.replace(allHyphensRegex, '-');
}

function syllablesInWord(text){
    text = dashesToHyphens(text);
    const allHyphensRegex = new RegExp(`${syllablefy.HYPHEN_CHAR}`, 'g');
    return text.split(allHyphensRegex).length;
}

describe('Syllablefy', () => {
    
    describe('single word tests', () => {
        // List the word, and the expected syllable break up using dashes
        const test_words = [
            [ 'cat', 'cat' ],
            [ 'also', 'al-so' ],
            [ 'count', 'count' ],
            [ 'definitely', 'def-i-nite-ly'],
            [ 'exactly', 'ex-act-ly']
        ];
        
        // Generate test cases for each word
        test_words.forEach(input => {
            const expectedSyllables = syllablesInWord(input[1]);
            
            it(`${input[0]} should have ${expectedSyllables} syllables`, () => {
                const actual = syllablefy.hyphenate(input[0]);
                const expected = dashesToHyphens(input[1]);
                expect(actual).to.equal(expected);
            });
        });
    });
});