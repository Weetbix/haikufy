var Hypher = require("hypher");
var Hypher_en = require('hyphenation.en-us');

// Add words here to specify exactly how they
// should be split
const exceptions = [
	'j-son'
];

function generateExceptions(){
	const EXCEPTION_HYPHEN = '\u2027';
	return exceptions.join(',').replace(/-/g, EXCEPTION_HYPHEN);
}

// Provides a tailored version of the hyphenation engine
// that better responds to syllables
class Syllablefy {    
	constructor(){
		// Setup the language pack for better syllable recognition
		// Minimum characters from the right is 2, for example ex-act-ly
		Hypher_en.rightmin = 2;
		
		Hypher_en.exceptions = generateExceptions();
		
		this.hypher = new Hypher(Hypher_en);
		this.HYPHEN_CHAR = '\u00AD';
	}
	
	hyphenate(text){
		const MIN_WORD_LENGTH = 3;
		return this.hypher.hyphenateText(text, MIN_WORD_LENGTH);
	}
}


module.exports = Syllablefy;