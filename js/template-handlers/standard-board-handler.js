// generates standard game board

game.standardBoardTemplateHandler = function(peopleSet, size) {
    var standardBoard = _.template($('#game-board').html(), { variable: 'm' });
    $('#content').html(standardBoard({ people: game.people.getPeople(peopleSet, size) }));
}
