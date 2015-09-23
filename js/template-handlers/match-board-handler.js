// generates a match game board

game.matchBoardTemplateHandler = function(peopleSet, size) {
    var deck = game.people.getPeople(peopleSet, size);

    var standardBoard = _.template($('#game-board').html(), { variable: 'm' });
    $('#content').html(standardBoard({ people: deck }));

    var matchCards = _.template($('#match-cards').html(), { variable: 'm' });
    $('#match-card-cont').html(matchCards({ people: game.utils.shuffle(deck) }));
}
