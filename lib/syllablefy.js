var Hypher = require("hypher");
var Hypher_en = require('hyphenation.en-us');

// Provides a tailored version of the hyphenation engine
// that better responds to syllables
class Syllablefy {    
    constructor(){
        this.hypher = new Hypher(Hypher_en);
        this.HYPHEN_CHAR = '\u00AD';
    }
    
    hyphenate(text){
        return this.hypher.hyphenateText(text);
    }
}


module.exports = Syllablefy;