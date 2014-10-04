/**
 * Formal Languajes Utils
 * @author facundoj
 */
(function (w) {
    w.Automata = w.Automata || {};

    /**
     * Capable to generate context-sensitive-languaje strings
     * @constructor
     */
    w.Automata.Turing = function () {
        this.rules = [];
    };

    w.Automata.Turing.prototype = {
        /**
         * Adds a production rule
         * @param left {String} left part of the rule (aAb)
         * @param rigth {String} right part of the rule (aGb)
         */
        addRule: function (left, right) {
            // @todo: Implement
        },
        /**
         * Generates strings based on the inserted rules
         * @param length {Number} generated string length
         * @return {String}
         */
        generateString: function (length) {
            // @todo: Implement
        }
    };

})(this);
