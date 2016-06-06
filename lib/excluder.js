
// Any words in this list will exclude a sentence
// from being considered a haiku. Essentially these
// should be acronyms, the correct way to deal with
// other types of words is to add them to the syllablefy
// exceptiosn list
const bannedWords = [
    'wtf',
    'dlc',
    'lmao',
    'lol'
];


module.exports = { 
    // Check if:
    // - the sentence contains any banned acronyms
    isValid: function(sentence){
        const split = sentence.toLowerCase().split(/\s+/);
        for(const word of split){
            if(bannedWords.indexOf(word) !== -1)
                return false;
        }
        
        return true;
    }
}