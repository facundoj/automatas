$(function () {
    var turingGrammar = new Automata.TuringGrammar(),

        // Cached buttons
        $generateBtn = $('#generate'),
        $addNoTerminalBtn = $('#addNoTerminal'),
        $addRuleBtn = $('#addRule'),
        // Cached production rules list
        $prodRulesList = $('.productionRules ul'),
        $noProdRulesItem = $('.noProdRules'),
        // Cached text inputs
        $leftSide = $('#ruleLeft'),
        $rightSide = $('#ruleRight'),
        $newSymbol = $('#newNoTerminal'),
        // Cached inline texts
        $result = $('#result'),
        $noTerminalsList = $('#noTerminalsList'),

        /**
         * Remove rule event handler
         */
        removeRule = function (event) {
            var $minus = $(event.currentTarget),
                rule = $minus.data('rule'),
                $rules, $prodRulesListItems;

            turingGrammar.removeRule(rule[0], rule[1]);
            $minus.closest('li').remove();

            $prodRulesListItems = $prodRulesList.find('li');

            if ($prodRulesListItems.length === 1) {
                $noProdRulesItem.show();
                $generateBtn.prop('disabled', true);
            }
        };

    // Adds a production rule
    $addRuleBtn.on('click', function () {
        var leftSideText = $leftSide.val(),
            rightSideText = $rightSide.val(),
            $newListItem, $minusIcon;

        try {
            turingGrammar.addRule(leftSideText, rightSideText);
        } catch (ex) {
            console.error('Couldn\'t add the production rule.');
            // @todo Add inline error
            return;
        }

        $leftSide.val('');
        $rightSide.val('');

        $minusIcon = $('<span></span>')
            .addClass('glyphicon')
            .addClass('glyphicon-minus')
            .addClass('removeRule')
            .data('rule', [leftSideText, rightSideText])
            .on('click', removeRule);

        $newListItem = $('<li></li>')
            .addClass('list-group-item')
            .text(leftSideText + ' --> ' + rightSideText)
            .append($minusIcon);

        $noProdRulesItem.hide();
        $prodRulesList.append($newListItem);
        $generateBtn.prop('disabled', false);

        $leftSide.focus();
    });

    // Generates new string of the languaje
    $generateBtn.on('click', function () {
        $result.text(turingGrammar.generateString());
    });

    // Adds a no-terminal symbol
    $addNoTerminalBtn.on('click', function () {
        var newSymbolText = $newSymbol.val();

        $newSymbol.val('');
        $newSymbol.focus();

        turingGrammar.addNoTerminal(newSymbolText);

        $noTerminalsList.text($noTerminalsList.text() + ', ' + newSymbolText);
    });
});
