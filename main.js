$(function () {
    var turingGrammar = new Automata.TuringGrammar();

    $('#addRule').on('click', function () {
        var leftSide = $('#ruleLeft'),
            rightSide = $('#ruleRight'),
            leftSideText = leftSide.val(),
            rightSideText = rightSide.val(),
            newListItem;

        try {
            turingGrammar.addRule(leftSideText, rightSideText);
        } catch (ex) {
            console.error('Invalid production rule');
            return;
        }

        leftSide.val('');
        rightSide.val('');

        newListItem = $('<li></li>')
            .addClass('list-group-item')
            .text(leftSideText + ' --> ' + rightSideText);

        $('.noProdRules').hide();
        $('.productionRules ul').append(newListItem);
        $('#generate').prop('disabled', false);
    });

    $('#generate').on('click', function () {
        $('#result').text(turingGrammar.generateString());
    });
});
