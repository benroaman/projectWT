game.initializePeople = function(data) {
    game.people = {};
    game.people.data = data;
    game.people.getPeople = function(peepSet, numPeeps) {
        var randomPeople = []
        while(randomPeople.length < numPeeps) {
            var newPerson = peepSet[Math.floor(Math.random() * peepSet.length)]
            if (randomPeople.indexOf(newPerson) === -1) {
                randomPeople.push(newPerson);
            }
        }
        return randomPeople;
    }
    game.people.matts = [];
    game.people.data.forEach(function(person) {
        if (person.name.toLowerCase().indexOf('matt') !== -1) {
            game.people.matts.push(person);
        }
    });
};
