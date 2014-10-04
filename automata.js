/**
 * Formal Languajes Utils
 * @author facundoj
 */
(function (window) {
    var Automata = Automata || {};

    /**
     * Validates and throws exception when not true
     * @param assertion {Boolean} To check
     * @param msg {String} Exception message
     */
    function assert (assertion, msg) {
        if (!assertion) throw msg;
    }

    /**
     * Context-sensitive grammar production rule
     * @constructor
     * @param left {String} left part of the rule (aAb)
     * @param rigth {String} right part of the rule (aGb)
     */
    var TuringProdRule = function (left, right) {
        assert(
            typeof left === 'string' && typeof right === 'string',
            "Invalid parameter"
        );

        if (left.length === 1) {

        } else if (left.length === 2) {

        } else if (left.length === 3) {

        }
    };

    /**
     * Capable to generate context-sensitive-languaje strings
     * @constructor
     */
    Automata.Turing = function () {
        this.rules = [];
    };

    Automata.Turing.prototype = {
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

    window.Automata = Automata;
})(this);
