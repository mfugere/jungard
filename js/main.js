"use strict";

var player = {
    hp: 20,
    att: 4,
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
            att: 2,
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

var getMemberByRef = function (ref) {
    var entities = {
        map: map,
        actors: actors,
        battle: battleActions
    };
    var array = ref.split("/");
    var entity = entities[array[0]];
    for (var i in entity) {
        if (entity[i].ref === ref) return entity[i];
    }
};

var interpolate = function (string, values) {
    for (var i = 0; i < values.length; i++) {
        string = string.replace("{" + i + "}", values[i]);
    }
    return string;
};

var Header = React.createClass({
    render: function () {
        var description = [ <p key={this.props.context.ref}>{this.props.context.description}</p> ];
        this.props.context.actions.forEach(function (action) {
            if (action.preview) description.push(<p key={action.ref + "/preview"}>{action.preview}</p>);
        }, description);
        if (this.props.extras.length > 0) {
            var extras = this.props.extras.split(",");
            for (var i in extras) {
                var extra = extras[i].split("/");
                var prop = (extra[0] === "battle") ? this.props.battleActions : this.props.context[extra[0]];
                for (var j in prop) {
                    if (prop[j].key === extra[1]) {
                        var value = (extra[0] === "battle" && extra[2])
                            ? interpolate(prop[j].value, extra[2].split("&")) : prop[j].value;
                        description.push(<p key={extras[i] + i}>{value}</p>);
                    }
                }
            }
        }
        return (
            <div>
                <div>
                    <button>Game</button>
                    <button>Player</button>
                    <button>Inventory</button>
                    <button>Map</button>
                    <button>Help</button>
                    <button>About</button>
                </div>
                <div>
                    <h1>{this.props.context.group}</h1>
                    <div>{description}</div>
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
            else this.props.showExtra(ref);
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
            current: this.props.map[0].ref,
            extras: "",
            battling: false
        };
    },
    doAction: function (ref) {
        if (this.state.battling) {
            switch (ref) {
                case "battle/attack":
                    var target = getMemberByRef(this.state.current);
                    target.battle.hp -= this.props.player.att;
                    this.addExtra(ref + "/" + target.group + "&" + this.props.player.att);
                    if (target.battle.hp <= 0) {
                        this.setState({ current: target.location, extras: "battle/win/" + target.group, battling: false });
                        this.kill(this.state.current);
                    }
                    break;
                case "battle/defend":
                    this.addExtra(ref);
                    break;
                case "battle/flee":
                    var targetLocation = getMemberByRef(this.state.current).location;
                    this.setState({ current: targetLocation, extras: ref, battling: false });
                    break;
                default:
                    break;
            }
        }
        else this.setState({ current: ref, extras: "" });
    },
    kill: function (ref) {
        for (var i in this.props.map) {
            var actions = this.props.map[i].actions;
            for (var j in actions) {
                if (actions[j].ref === ref) delete actions[j];
            }
        }
    },
    addExtra: function (ref) {
        var extras = this.state.extras.split(",");
        var extra = (ref.indexOf(this.state.current) !== -1) ? ref.replace(this.state.current, "").substring(1) : ref;
        extras.push(extra);
        this.setState({ extras: extras.join() });
    },
    battle: function () {
        this.setState({ battling: !this.state.battling });
    },
    render: function () {
        var actions = (this.state.battling) ? this.props.battleActions : getMemberByRef(this.state.current).actions;
        return (
            <div class="container">
                <Header context={getMemberByRef(this.state.current)} extras={this.state.extras} battleActions={this.props.battleActions} />
                <Actions context={getMemberByRef(this.state.current)} actions={actions} onAction={this.doAction} showExtra={this.addExtra} battle={this.battle} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Game player={player} map={map} actors={actors} battleActions={battleActions} />,
    document.getElementById("game")
);