var Hypher = require("hypher");
var Hypher_en = require('hyphenation.en-us');

// The character hyphenator inserts at syllables
const HYPHER_CHAR = '\u00AD';

class Haikufy {
    constructor(){
        this.hypher = new Hypher(Hypher_en);
    }
    
	find(text){
		const hyphenated = this.hypher.hyphenateText(text);
		
		// Split our string by white space and the special hyphen 
		// character that is added. We capture the split characters
		// so that we can reconstruct the sentence
		const splitRegex = new RegExp( `([${HYPHER_CHAR}\\s]+)`, 'g');
		let splitText = hyphenated.split(splitRegex);
		
		// the syllables are all the non-white space 
		let syllables = splitText.filter(token => !token.match(splitRegex));
		
		if(syllables.length === 17){
			// Find the point in the split text array where the syllables are
			let syllableIndex = {
				5: findIndexOfSyllable(splitText, 5, splitRegex),
				12: findIndexOfSyllable(splitText, 12, splitRegex)
			}
			
			// Rebuild the text split at the 5th and 12th syllables
			return [
				splitText.slice(0, syllableIndex[5] + 1).join(''),
				splitText.slice(syllableIndex[5] + 1,syllableIndex[12] + 1).join(''),
				splitText.slice(syllableIndex[12] + 1).join('')
			];
		}
	}    
}

// Given an array of split characters, including hyphens and white
// space, it will return the index in splitArray where the syllableNumber
// is, or null for invalid. 
// eg: ['I', ' ', 'am', ' ', 'a', ' ', 'horse' ]
//     findIndexOfSyllable(arr, 4) returns 6 
function findIndexOfSyllable(splitArray, syllableNumber, splitRegex){
	let syllableCount = 0; 
	for(let i = 0; i < splitArray.length; i++){
		if(!splitArray[i].match(splitRegex)){
			syllableCount++;
		}
		
		// If we found the desired syllable, return the index
		if(syllableCount === syllableNumber){
			return i;
		}
	}
	
	// No result
	return null;
}

module.exports = Haikufy;