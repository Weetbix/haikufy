const Syllablefy = require('./syllablefy');

class Haikufy {
    constructor(){
        this.syllablefy = new Syllablefy();
    }
    
	find(text){
		const hyphenated = this.syllablefy.hyphenate(text);
		
		// Split our string by white space and the special hyphen 
		// character that is added. We capture the split characters
		// so that we can reconstruct the sentence
		const splitRegex = new RegExp( `([${this.syllablefy.HYPHEN_CHAR}\\s]+)`, 'g');
		let splitText = hyphenated.split(splitRegex);
		
		// the syllables are all the non-white space 
		let syllables = splitText.filter(token => !token.match(splitRegex));
		
		if(syllables.length === 17){			
			// Find the point in the split text array where the syllables are
			let syllableIndex = {
				5: findIndexOfSyllable(splitText, 5, splitRegex),
				12: findIndexOfSyllable(splitText, 12, splitRegex)
			}
			
			// Our text has 17 syllables, but the breaks must not be in the
			// middle of words so check that the next item in the split array is whitespace
			const whiteSpaceRegex = /\s+/;
			if(!splitText[syllableIndex[5] + 1].match(whiteSpaceRegex) ||
			   !splitText[syllableIndex[12] + 1].match(whiteSpaceRegex)) {
				return null;
			}
			
			// Rebuild the text split at the 5th and 12th syllables
			let haiku = [
				splitText.slice(0, syllableIndex[5] + 1).join(''),
				splitText.slice(syllableIndex[5] + 1,syllableIndex[12] + 1).join(''),
				splitText.slice(syllableIndex[12] + 1).join('')
			];
			
			// Santise the output
			var allHyphersRegex = new RegExp(`${this.syllablefy.HYPHEN_CHAR}`, 'g');
			haiku = haiku.map(line =>
				line.trim()
				.replace(allHyphersRegex, ''));
			
			return haiku;
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