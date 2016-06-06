var Hypher = require("hypher");
var Hypher_en = require('hyphenation.en-us');

// Provides a tailored version of the hyphenation engine
// that better responds to syllables
class Syllablefy {    
    constructor(){
        // Setup the language pack for better syllable recognition
        // Minimum characters from the right is 2, for example ex-act-ly
        Hypher_en.rightmin = 2;
        
        this.hypher = new Hypher(Hypher_en);
        this.HYPHEN_CHAR = '\u00AD';
    }
    
    hyphenate(text){
        const MIN_WORD_LENGTH = 3;
        return this.hypher.hyphenateText(text, MIN_WORD_LENGTH);
    }
}


module.exports = Syllablefy;