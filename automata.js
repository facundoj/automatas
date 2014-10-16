/**
 * Formal Languajes Utils
 * @author facundoj
 */
(function (window) {
    var Automata = Automata || {};

    const START_SYMBOL = 'S';

    /**
     * Validates and throws exception when not true
     * @param assertion {Boolean} To check
     * @param msg {String} Exception message
     */
    function assert (assertion, msg) {
        if (!assertion) throw (msg || 'Assertion failed');
    }

    /**
     * Retrieves any value of the Set
     * @param set {Set}
     */
    function getAny (set) {
        var length = set.size,
            it = set.values(),
            randomNumber = Math.floor(Math.random() * length) + 1,
            i, value;

        for (i = 0; i < randomNumber; i+= 1) {
            value = it.next().value
        }

        return value;
    }

    /**
     * Context-sensitive grammar production rule
     * @constructor
     * @param left {String} left part of the rule (aAb)
     * @param rigth {String} right part of the rule (aGb)
     */
    var TuringProdRule = function (left, right, noTerminals) {
        assert(
            typeof left === 'string' && typeof right === 'string',
            "Invalid parameter"
        );

        if (left.length === 1) {
            assert(noTerminals.has(left[0]) || left[0] === START_SYMBOL, 'Invalid production rule');
        } else if (left.length === 2) {
            assert(
                left[0] === right[0] || left[1] === right[right.length - 1],
                'Invalid production rule'
            );
            assert(
                noTerminals.has(left[0]) || noTerminals.has(left[1]),
                'Invalid production rule'
            );
        } else if (left.length === 3) {
            assert(
                left[0] === right[0] && left[2] === right[right.length - 1],
                'Invalid production rule'
            );
            assert(noTerminals.has(left[1]), 'Invalid production rule');
        } else {
            throw 'Invalid production rule';
        }

        this.rightSide = right;
        this.leftSide = left;
    };

    /**
     * Capable to generate context-sensitive-languaje strings
     * @constructor
     */
    Automata.TuringGrammar = function () {
        this.$$rules = Object.create(null);
        this.$$noTerminals = new Set();
    };

    Automata.TuringGrammar.prototype = {

        /**
         * Adds a production rule
         * @param left {String} left part of the rule (aAb)
         * @param rigth {String} right part of the rule (aGb)
         */
        addRule: function (left, right) {
            // The instantiation makes the necesary validations for the rule
            // @todo Replace instantiation by check only
            var prodRule = new TuringProdRule(left, right, this.$$noTerminals);
            this.$$rules[left] = this.$$rules[left] || new Set();
            this.$$rules[left].add(right);
        },

        /**
         * Removes a production rule
         * @param left {String} left part of the rule (aAb)
         * @param rigth {String} right part of the rule (aGb)
         */
        removeRule: function (left, right) {
            var ruleGroup = this.$$rules[left];
            if (ruleGroup.has(right)) {
                ruleGroup.delete(right);
                return true;
            }
            return false;
        },

        /**
         * Adds a no-terminal symbol to the array
         * @param symbol {String}
         */
        addNoTerminal: function (symbol) {
            assert(typeof symbol === 'string', 'Symbol must be a string');
            assert(symbol.length === 1, 'Symbol must be a single character');
            this.$$noTerminals.add(symbol);
        },

        /**
         * Generates strings based on the inserted rules
         * @return {String}
         */
        generateString: function () {
            var rules = this.$$rules,
                startRules = rules[START_SYMBOL],
                output = null,
                symbol, foundCoincidence, newValue;

            if (!!startRules) {
                output = getAny(startRules);
            }

            if (typeof output === 'string') {
                foundCoincidence = true;
                while (foundCoincidence) {
                    foundCoincidence = false;
                    for (symbol in rules) {
                        if (Object.prototype.hasOwnProperty.call(rules, symbol) &&
                                typeof symbol === 'string' &&
                                !foundCoincidence) {
                            if (output.indexOf(symbol) !== -1) {
                                newValue = getAny(rules[symbol]);
                                console.log('Found %s in %s. Replacing by %s', symbol, output, newValue);
                                output = output.replace(
                                    symbol,
                                    newValue
                                );
                                foundCoincidence = true;
                            }
                        }
                    }
                }
            }
            return output;
        }
    };

    window.Automata = Automata;
})(this);
