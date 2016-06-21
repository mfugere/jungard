"use strict";

var actors = [
    {
        ref: "jim",
        group: "Jim",
        description: "You see a man. He says his name is Jim.",
        dialog: [
            {
                ref: "hi",
                description: "Hey buddy, what's your favorite color?",
                type: "intro"
            }
        ],
        actions: [
            {
                ref: "home",
                description: "Blue!",
                type: "map"
            },
            {
                ref: "grassland",
                description: "Red!",
                type: "map"
            }
        ]
    }
];

var objects = [
];

var map = [
    {
        ref: "home",
        group: "Home",
        description: "Welcome to the world! The sky is blue and the grass is green.",
        actions: [
            {
                ref: "grassland",
                description: "Go east",
                type: "map"
            },
            {
                ref: "forestedge",
                description: "Go southeast",
                type: "map"
            }
        ]
    },
    {
        ref: "grassland",
        group: "Grassland",
        description: "Wow this place is boring. There isn't much to this place.",
        actions: [
            {
                ref: "home",
                description: "Go west",
                type: "map"
            },
            {
                ref: "forestedge",
                description: "Go south",
                type: "map"
            },
            {
                ref: "forest",
                description: "Go east",
                type: "map"
            }
        ]
    },
    {
        ref: "forestedge",
        group: "Forest Edge",
        description: "You're finding your way around. This zone has some nice trees.",
        actions: [
            {
                ref: "home",
                description: "Go northwest",
                type: "map"
            },
            {
                ref: "grassland",
                description: "Go north",
                type: "map"
            },
            {
                ref: "forest",
                description: "Go northeast",
                type: "map"
            }
        ]
    },
    {
        ref: "forest",
        group: "Forest",
        description: "You find yourself in a forest. It's dark and spooky.",
        actions: [
            {
                ref: "grassland",
                description: "Go west",
                type: "map"
            },
            {
                ref: "forestedge",
                description: "Go southwest",
                type: "map"
            },
            {
                ref: "jim",
                description: "Talk to Jim",
                type: "actors"
            }
        ]
    }
];

var getMemberByRef = function (array, ref) {
    var entities = {
        map: map,
        actors: actors
    };
    var a = entities[array]
    for (var i in a) {
        if (a[i].ref === ref) return a[i];
    }
};

var Header = React.createClass({
    render: function () {
        var description = [ <p key={this.props.context.ref}>{this.props.context.description}</p> ];
        this.props.context.actions.forEach(function (action) {
            if (action.type === "actors") description.push(<p key={action.ref}>{getMemberByRef("actors", action.ref).description}</p>);
        }, description);
        if (this.props.context.dialog) {
            description.push(<p key={this.props.context.dialog[0].ref}>They say &quot;{this.props.context.dialog[0].description}&quot;</p>);
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
    handleAction: function (ref, type) {
        this.props.onAction(ref, type);
    },
    render: function () {
        var buttons = [];
        this.props.context.actions.forEach(function (action) {
            buttons.push(<button key={action.ref} onClick={this.handleAction.bind(this, action.ref, action.type)}>{action.description}</button>);
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
            map: this.props.map,
            actors: this.props.actors,
            current: { ref: this.props.map[0].ref, type: "map" }
        };
    },
    doAction: function (ref, type) {
        this.setState({
            map: this.props.map,
            actors: this.props.actors,
            current: { ref: ref, type: type }
        });
    },
    render: function () {
        return (
            <div class="container">
                <Header context={getMemberByRef(this.state.current.type, this.state.current.ref)} />
                <Actions context={getMemberByRef(this.state.current.type, this.state.current.ref)} onAction={this.doAction} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Game map={map} actors={actors} />,
    document.getElementById("game")
);