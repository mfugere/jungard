"use strict";

var player = {
    hp: 20,
    att: 8,
    ac: 5
};

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
            att: 6,
            ac: 3
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
        value: "You hit the {0} and do {1} points of damage."
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
        value: "The {0} hit you for {1} points of damage."
    },
    {
        ref: "battle/win",
        key: "win",
        value: "You defeated the {0}!"
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
    }
];

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
            current: this.props.entities.map[0],
            messages: [],
            battling: false
        };
    },
    doAction: function (ref) {
        if (this.state.battling) {
            var messages = [];
            var actionMessage;
            var actors = this.state.actors;
            var target = getMemberByRef(actors, this.state.current.ref);
            for (var i in this.props.entities.battle) {
                if (this.props.entities.battle[i].ref === ref) {
                    actionMessage = this.props.entities.battle[i].value
                }
            }
            switch (ref) {
                case "battle/attack":
                    var enemyDamage = this.props.entities.player.att - target.battle.ac;
                    target.battle.hp -= enemyDamage;
                    this.setState({ actors: actors });
                    messages.push(interpolate(actionMessage, [ target.group, enemyDamage]));
                    if (target.battle.hp <= 0) {
                        this.doAction("battle/win");
                    }
                    break;
                case "battle/defend":
                    messages.push(actionMessage);
                    break;
                case "battle/flee":
                    this.setState({ current: getMemberByRef(this.state.map, target.location), messages: [ actionMessage ], battling: false });
                    messages.push(actionMessage);
                    break;
                case "battle/win":
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(interpolate(actionMessage, [ target.group ]));
                    this.kill(this.state.current.ref);
                    break;
                case "battle/hit":
                    var playerAc = this.props.entities.player.ac;
                    var playerDamage = target.battle.att - playerAc; // TODO: check for < 0
                    this.props.entities.player.hp -= playerDamage;
                    messages.push(interpolate(actionMessage, [ target.group, playerDamage ]));
                    break;
                default:
                    break;
            }
            if (this.state.battling && ref !== "battle/hit") {
                this.doAction("battle/hit");
            }
            this.addMessages(messages);
        }
        else {
            var splitRef = ref.split("/");
            var next = getMemberByRef(this.props.entities[ref.split("/")[0]], ref);
            this.setState({ current: next, messages: [] });
        }
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
        this.setState({ battling: !this.state.battling });
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
    <Game entities={{ player: player, battle: battleActions, actors: actors, map: map }} />,
    document.getElementById("game")
);