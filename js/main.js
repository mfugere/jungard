"use strict";

var levelUpExp = 100;

var objects = [
    {
        ref: "objects/shortsword",
        group: "sword",
        description: "This sword describes my sex life: short, simple, and not very effective.",
        stats: [
            {
                key: "Attack",
                value: 6
            }
        ]
    },
    {
        ref: "objects/leatherarmor",
        group: "leather armor",
        description: "This is a simple light body and leg armor.",
        stats: [
            {
                key: "Defense",
                value: 8
            }
        ]
    },
    {
        ref: "objects/leatherboots",
        group: "leather armor",
        description: "This boots are light and provide some defense.",
        stats: [
            {
                key: "Defense",
                value: 4
            }
        ]
    }
]

var actors = [
    {
        ref: "actors/jim",
        group: "Jim",
        description: "You see a man. He's wearing a baseball cap and has a wooden leg.",
        location: "map/forest",
        dialog: [
            {
                key: "intro",
                value: "Hey buddy, my name is Jim!"
            }
        ],
        actions: [
            {
                ref: "actors/jim/dialog/intro",
                description: "Introduce yourself!"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/spider",
        group: "Spider",
        description: "A spider is crawling about.",
        location: "map/deepforest",
        battle: {
            hp: 10,
            str: 4,
            ac: 10,
            init: 1,
            exp: 100
        },
        actions: [
            {
                ref: "actors/spider/battle",
                description: "Fight!"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    }
];

var battleActions = [
    {
        ref: "battle/attack",
        description: "Attack",
        key: "attack",
        value: "You attack the {0} and {1}"
    },
    {
        ref: "battle/defend",
        description: "Defend",
        key: "defend",
        value: "You hunker down."
    },
    {
        ref: "battle/flee",
        description: "Flee",
        key: "flee",
        value: "You run away!"
    },
    {
        ref: "battle/hit",
        key: "hit",
        value: "The {0} attacks you and {1}"
    },
    {
        ref: "battle/win",
        key: "win",
        value: "You defeated the {0}! You obtained {1} experience points."
    }
];

var map = [
    {
        ref: "map/home",
        group: "Home",
        description: "Welcome to the world! The sky is blue and the grass is green.",
        actions: [
            {
                ref: "map/grassland",
                description: "Go east"
            },
            {
                ref: "map/forestedge",
                description: "Go southeast"
            }
        ]
    },
    {
        ref: "map/grassland",
        group: "Grassland",
        description: "Wow this place is boring. There isn't much to this place.",
        actions: [
            {
                ref: "map/home",
                description: "Go west"
            },
            {
                ref: "map/forestedge",
                description: "Go south"
            },
            {
                ref: "map/forest",
                description: "Go east"
            }
        ]
    },
    {
        ref: "map/forestedge",
        group: "Forest Edge",
        description: "You're finding your way around. This zone has some nice trees.",
        actions: [
            {
                ref: "map/home",
                description: "Go northwest"
            },
            {
                ref: "map/grassland",
                description: "Go north"
            },
            {
                ref: "map/forest",
                description: "Go northeast"
            }
        ]
    },
    {
        ref: "map/forest",
        group: "Forest",
        description: "You find yourself in a forest. It's dark and spooky.",
        actions: [
            {
                ref: "map/grassland",
                description: "Go west"
            },
            {
                ref: "map/forestedge",
                description: "Go southwest"
            },
            {
                ref: "map/deepforest",
                description: "Go east"
            },
            {
                ref: "actors/jim",
                preview: "You see a man.",
                description: "Approach man"
            }
        ]
    },
    {
        ref: "map/deepforest",
        group: "Deep Forest",
        description: "You're now in a dark part of the forest. It's darker and spookier.",
        actions: [
            {
                ref: "map/forest",
                description: "Go west"
            },
            {
                ref: "actors/spider",
                preview: "You see a large spider.",
                description: "Approach spider"
            }
        ]
    },
    {
        ref: "map/death",
        group: "You died!",
        description: "Your eyelids draw shut as you gasp for your last breath of air. Remember that death is not the end, but only a transition.",
        actions: [
            {
                ref: "options/newgame",
                description: "Start a new game"
            }
        ]
    }
];

var diceRoll = function (sides, numDice) {
    if (numDice === undefined) numDice = 1;
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

var MenuBar = React.createClass({
    render: function () {
        return (
            <div>
                <button>Game</button>
                <button>Player</button>
                <button>Inventory</button>
                <button>Map</button>
                <button>Help</button>
                <button>About</button>
            </div>
        );
    }
});

var Header = React.createClass({
    render: function () {
        var previews = [];
        this.props.context.actions.forEach(function (action) {
            if (action.preview) previews.push(<p key={action.ref + "/preview"}>{action.preview}</p>);
        }, previews);
        var messages = [];
        if (this.props.messages.length > 0) {
            for (var i in this.props.messages) {
                messages.push(<p key={"message" + i}>{this.props.messages[i]}</p>);
            }
        }
        return (
            <div>
                <MenuBar />
                <div>
                    <h1>{this.props.context.group}</h1>
                    <p>{this.props.context.description}</p>
                    <div>{previews}</div>
                    <div>{messages}</div>
                </div>
            </div>
        );
    }
});

var Actions = React.createClass({
    handleAction: function (ref) {
        if (ref === "..") ref = this.props.context.location;
        if (ref.indexOf(this.props.context.ref) !== -1) {
            if (ref.indexOf("battle") !== -1) this.props.battle();
            else {
                var message = ref.replace(this.props.context.ref, "").substring(1);
                var messageSet = message.split("/");
                this.props.showMessage(messageSet[0], messageSet[messageSet.length - 1]);
            }
        }
        else this.props.onAction(ref);
    },
    render: function () {
        var buttons = [];
        this.props.actions.forEach(function (action) {
            if (action.description) buttons.push(<button key={action.ref} onClick={this.handleAction.bind(this, action.ref)}>{action.description}</button>);
        }, this);
        return (
            <div>{buttons}</div>
        );
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">Copyright 2016 Matt Fugere. All rights reserved.</div>
                </div>
            </div>
        );
    }
});

var Game = React.createClass({
    getInitialState: function () {
        return {
            map: this.props.entities.map,
            actors: this.props.entities.actors,
            player: {
                hp: 20, crg: 0, str: 3, dex: 3, chr: 3, int: 0,
                level: 1, exp: 0,
                weapon: getMemberByRef(this.props.entities.objects, "objects/shortsword"),
                armor: [
                    getMemberByRef(this.props.entities.objects, "objects/leatherarmor"),
                    getMemberByRef(this.props.entities.objects, "objects/leatherboots")
                ],
                activeEffects: {},
                ac: function () {
                    var totalAc = this.dex;
                    for (var i in this.armor) {
                        for (var j in this.armor[i].stats) {
                            if (this.armor[i].stats[j].key === "Defense") totalAc += this.armor[i].stats[j].value;
                        }
                    }
                    return totalAc;
                },
                attackRoll: function () {
                    for (var i in this.weapon.stats) {
                        if (this.weapon.stats[i].key === "Attack") return this.weapon.stats[i].value;
                    }
                }
            },
            current: this.props.entities.map[0],
            messages: [],
            battling: false
        };
    },
    enemyTurn: function (enemy) {
        var hitStatus = "";
        var player = this.state.player;
        var playerAc = player.ac();
        if (player.activeEffects.ac) {
            playerAc += player.activeEffects.ac;
            delete player.activeEffects.ac;
        }
        if (diceRoll(20) >= playerAc) {
            var playerDamage = diceRoll(enemy.battle.str);
            player.hp -= playerDamage;
            this.setState({ player: player });
            hitStatus = "does " + playerDamage + " points of damage.";
        } else {
            hitStatus = "misses!";
        }
        for (var i in this.props.entities.battle) {
            if (this.props.entities.battle[i].ref === "battle/hit") {
                this.addMessages([ interpolate(this.props.entities.battle[i].value, [ enemy.group, hitStatus ]) ]);
            }
        }
        if (player.hp <= 0) {
            this.setState({ battling: false }, function () {
                this.doAction("map/death");
            });
        }
    },
    doAction: function (ref) {
        if (ref === "options/newgame") {
            this.setState(this.getInitialState());
            return;
        }
        var nextAction;
        if (this.state.battling) {
            var messages = [];
            var actionMessage;
            var actors = this.state.actors;
            var target = this.state.current;
            for (var i in this.props.entities.battle) {
                if (this.props.entities.battle[i].ref === ref) {
                    actionMessage = this.props.entities.battle[i].value
                }
            }
            switch (ref) {
                case "battle/attack":
                    var hitStatus = "";
                    if (diceRoll(20) + this.state.player.str >= target.battle.ac) {
                        var enemyDamage = diceRoll(this.state.player.attackRoll());
                        target.battle.hp -= enemyDamage;
                        this.setState({ actors: actors });
                        hitStatus = "do " + enemyDamage + " points of damage.";
                        if (target.battle.hp <= 0) {
                            nextAction = "battle/win";
                        }
                    } else {
                        hitStatus = "miss!";
                    }
                    messages.push(interpolate(actionMessage, [ target.group, hitStatus ]));
                    break;
                case "battle/defend":
                    var player = this.state.player;
                    player.activeEffects.ac = 2;
                    this.setState({ player: player });
                    messages.push(actionMessage);
                    break;
                case "battle/flee":
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(actionMessage);
                    break;
                case "battle/win":
                    var player = this.state.player;
                    player.exp += target.battle.exp;
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(interpolate(actionMessage, [ target.group, target.battle.exp ]));
                    if (player.exp >= levelUpExp) {
                        player.level += 1;
                        player.exp = player.exp % levelUpExp;
                        messages.push("You've ascended to Level " + player.level + "!");
                    }
                    this.kill(this.state.current.ref);
                    break;
                default:
                    break;
            }
            if (target.battle.hp > 0 && (ref === "battle/attack" || ref === "battle/defend")) {
                nextAction = "battle/enemy";
            }
            this.addMessages(messages);
        }
        else {
            var splitRef = ref.split("/");
            var next = getMemberByRef(this.props.entities[ref.split("/")[0]], ref);
            this.setState({ current: next, messages: [] });
        }
        if (nextAction) (nextAction === "battle/enemy") ? this.enemyTurn(target) : this.doAction(nextAction);
    },
    kill: function (ref) {
        var map = this.props.entities.map;
        for (var i in map) {
            var actions = map[i].actions;
            for (var j in actions) {
                if (actions[j].ref === ref) delete actions[j];
                this.setState({ map: map });
            }
        }
    },
    showMessage: function (table, key, values) {
        var property = this.state.current[table];
        for (var i in property) {
            if (property[i].key === key) {
                if (values !== undefined) addMessages([ interpolate(property[i].value, values) ]);
                else this.addMessages([ property[i].value ]);
            }
        }
    },
    addMessages: function (messages) {
        this.setState(function(prev, props) {
            var newMessages = prev.messages.concat(messages);
            return { messages: newMessages };
        });
    },
    battle: function () {
        this.setState({ battling: !this.state.battling }, function () {
            var tInit = diceRoll(20) + this.state.current.battle.init;
            var pInit = diceRoll(20) + this.state.player.dex;
            if (tInit > pInit) this.enemyTurn(this.state.current);
        });
    },
    render: function () {
        var actions = (this.state.battling) ? this.props.entities.battle : this.state.current.actions;
        return (
            <div>
                <Header context={this.state.current} messages={this.state.messages} />
                <Actions context={this.state.current} actions={actions} onAction={this.doAction} showMessage={this.showMessage} battle={this.battle} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Game entities={{ objects: objects, battle: battleActions, actors: actors, map: map }} />,
    document.getElementById("game")
);