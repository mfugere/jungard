"use strict";

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
    }
];

var objects = [
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
                ref: "actors/jim",
                preview: "You see a man.",
                description: "Approach man"
            }
        ]
    }
];

var getMemberByRef = function (ref) {
    var entities = {
        map: map,
        actors: actors
    };
    console.log(ref);
    var array = ref.split("/");
    var entity = entities[array[0]];
    for (var i in entity) {
        if (entity[i].ref === ref) return entity[i];
    }
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
                var prop = this.props.context[extra[0]];
                for (var j in prop) {
                    if (prop[j].key === extra[1]) {
                        description.push(<p key={extras[i] + i}>{prop[j].value}</p>);
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
        if (ref.indexOf(this.props.context.ref) !== -1) this.props.showExtra(ref);
        else this.props.onAction(ref);
    },
    render: function () {
        var buttons = [];
        this.props.context.actions.forEach(function (action) {
            buttons.push(<button key={action.ref} onClick={this.handleAction.bind(this, action.ref)}>{action.description}</button>);
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
            extras: ""
        };
    },
    doAction: function (ref) {
        this.setState({ current: ref, extras: "" });
    },
    addExtra: function (ref) {
        var extras = this.state.extras.split(",");
        var extra = ref.replace(this.state.current, "");
        extras.push(extra.substring(1));
        this.setState({ extras: extras.join() });
    },
    render: function () {
        return (
            <div class="container">
                <Header context={getMemberByRef(this.state.current)} extras={this.state.extras} />
                <Actions context={getMemberByRef(this.state.current)} onAction={this.doAction} showExtra={this.addExtra} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Game map={map} actors={actors} />,
    document.getElementById("game")
);