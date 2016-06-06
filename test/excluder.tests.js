const expect = require('chai').expect;
const excluder = require('../lib/excluder');

describe('Excluder', () => {
    
    describe('common acronyms', () => {
        it('should no be allowed at the front of sentences', () => {
            expect(excluder.isValid('wtf is going on here'))
                .to.be.false;
        });
        
        it('should not be allowed at the end of sentences', () => {
            expect(excluder.isValid('wow dlc is cool'))
                .to.be.false;         
        });
        
        it('should not be allowed in the middle of a sentence', () => {
            expect(excluder.isValid('wow wtf seriously'))
                .to.be.false;         
        });
        
        it('should not be allowed on its own', () => {
            expect(excluder.isValid('wtf'))
                .to.be.false; 
        });
        
        it('should not be allowed regardless of capitalisation', () => {
            expect(excluder.isValid('really WTF is that'))
                .to.be.false; 
        });
        
        it('should allow them if they are part of a legitimate word', () => {
            expect(excluder.isValid('I have a lollypop in my hand'))
                .to.be.true;
        });
        
        
    });
});