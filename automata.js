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
        if (!assertion) throw (msg || 'Assertion failed');
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

        if (left.length === 2) {
            assert(
                left[0] === right[0] || left[1] === right[right.length - 1],
                'Invalid production rule'
            );
        } else if (left.length === 3) {
            assert(
                left[0] === right[0] && left[2] === right[right.length - 1],
                'Invalid production rule'
            );
        } else if (left.length !== 1) {
            throw 'Invalid production rule';
        }

        this.rightSide = right;
        this.leftSide = left;
    };

    TuringProdRule.prototype = {
        // @todo: Implement
    };

    /**
     * Capable to generate context-sensitive-languaje strings
     * @constructor
     */
    Automata.TuringGrammar = function () {
        this.rules = [];
        this.noTerminals = [];
        this.startSymbol = 'S';
    };

    Automata.TuringGrammar.prototype = {

        /**
         * Adds a production rule
         * @param left {String} left part of the rule (aAb)
         * @param rigth {String} right part of the rule (aGb)
         */
        addRule: function (left, right) {
            this.rules.push(new TuringProdRule(left, right));
        },

        /**
         * Adds a no-terminal symbol to the array
         * @param symbol {String}
         */
        addNoTerminal: function (symbol) {
            assert(typeof symbol === 'string', 'Symbol must be a string');
            assert(symbol.length === 1, 'Symbol must be a single character');
            this.noTerminals.push(symbol);
        },

        /**
         * Sets the starting symbol. "S" by default
         * @param symbol {String}
         */
        setStartSymbol: function (symbol) {
            assert(typeof symbol === 'string', 'Symbol must be a string');
            assert(symbol.length === 1, 'Symbol must be a single character');
            this.startSymbol = symbol;
        },

        /**
         * Generates strings based on the inserted rules
         * @param length {Number} generated string length
         * @return {String}
         */
        generateString: function (length) {
            // @todo: Look for start symbol (S) and take one option.
            // @todo: Replace by new string
        }
    };

    window.Automata = Automata;
})(this);
