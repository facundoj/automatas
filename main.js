$(function () {
    var turingGrammar = new Automata.TuringGrammar();

    var removeRule = function (event) {
        var $minus = $(event.currentTarget),
            rule = $minus.data('rule'), $rules;

        turingGrammar.removeRule(rule[0], rule[1]);
        $minus.closest('li').remove();

        $rules = $('.productionRules li');
        if ($rules.length === 1) {
            $rules.show();
            $('#generate').prop('disabled', true);
        }
    };

    $('#addRule').on('click', function () {
        var $leftSide = $('#ruleLeft'),
            $rightSide = $('#ruleRight'),
            leftSideText = $leftSide.val(),
            rightSideText = $rightSide.val(),
            $newListItem, $minusIcon;

        try {
            turingGrammar.addRule(leftSideText, rightSideText);
        } catch (ex) {
            console.error('Invalid production rule');
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

        $('.noProdRules').hide();
        $('.productionRules ul').append($newListItem);
        $('#generate').prop('disabled', false);

        $leftSide.focus();
    });

    $('#generate').on('click', function () {
        $('#result').text(turingGrammar.generateString());
    });

    $('#addNoTerminal').on('click', function () {
        var $newSymbol = $('#newNoTerminal'),
            newSymbolText = $newSymbol.val(),
            $noTerminalsList = $('#noTerminalsList');

        $newSymbol.val('');
        $newSymbol.focus();

        turingGrammar.addNoTerminal(newSymbolText);

        $noTerminalsList.text($noTerminalsList.text() + ', ' + newSymbolText);
    });
});
