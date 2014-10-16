$(function () {
    var turingGrammar = new Automata.TuringGrammar();

    $('#addRule').on('click', function () {
        var $leftSide = $('#ruleLeft'),
            $rightSide = $('#ruleRight'),
            leftSideText = $leftSide.val(),
            rightSideText = $rightSide.val(),
            $newListItem;

        try {
            turingGrammar.addRule(leftSideText, rightSideText);
        } catch (ex) {
            console.error('Invalid production rule');
            return;
        }

        $leftSide.val('');
        $rightSide.val('');

        $newListItem = $('<li></li>')
            .addClass('list-group-item')
            .text(leftSideText + ' --> ' + rightSideText);

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
