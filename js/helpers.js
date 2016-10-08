var diceRoll = function (sides, numDice) {
    if (numDice === undefined) numDice = 1;
    if (sides < 0) sides = 1;
    var total = 0;
    for (var i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

var getMemberByRef = function (array, ref) {
    for (var i in array) {
        if (array[i].ref === ref) return array[i];
    }
};

var interpolate = function (string, values) {
    for (var i = 0; i < values.length; i++) {
        string = string.replace("{" + i + "}", values[i]);
    }
    return string;
};

var timeDifference = function (t1, t2) {
    if (t1 - t2 < 0) {
        return 24 - t2 + t1;
    } else return t1 - t2;
};

var sortBy = function (arr, args) {
    var result = arr;
    for (var i in args) {
        result.sort(function (a, b) {
            return (a[args[i]] < b[args[i]]) ? -1 : ((a[args[i]] === b[args[i]]) ? 0 : 1);
        });
    }
    return result;
};